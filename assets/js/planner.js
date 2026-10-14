(() => {
  'use strict';

  const D = window.IVE_DATA;
  const STORE = 'ive-content-planner-v3';
  const UI_STORE = 'ive-content-planner-ui-v3';
  const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const $ = (sel, root = document) => root.querySelector(sel);
  const esc = (s = '') => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // ── Dates (all stored as local YYYY-MM-DD strings) ─────────────────
  const pad = n => String(n).padStart(2, '0');
  const toKey = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const fromKey = k => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d); };
  const addDays = (k, n) => { const d = fromKey(k); d.setDate(d.getDate() + n); return toKey(d); };
  const todayKey = () => toKey(new Date());
  const fmtLong = k => fromKey(k).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const fmtShort = k => fromKey(k).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const fmtTime = t => {
    if (!t) return '';
    const [h, m] = t.split(':').map(Number);
    return `${((h + 11) % 12) + 1}:${pad(m)} ${h < 12 ? 'AM' : 'PM'}`;
  };

  // ── State ──────────────────────────────────────────────────────────
  const clone = o => JSON.parse(JSON.stringify(o));
  function loadSaved() {
    try { return JSON.parse(localStorage.getItem(STORE)) || {}; } catch (e) { return {}; }
  }
  function save() {
    try { localStorage.setItem(STORE, JSON.stringify({ posts, events })); } catch (e) { /* ignore */ }
  }
  const saved0 = loadSaved();
  let posts = Array.isArray(saved0.posts) ? saved0.posts : clone(D.posts);
  let events = Array.isArray(saved0.events) ? saved0.events : clone(D.events);

  const ui = {
    month: '2026-10',
    view: window.innerWidth < 640 ? 'list' : 'month',
    channels: new Set(Object.keys(D.channels)),
    category: 'all',
    status: 'all',
    event: null
  };
  try {
    const saved = JSON.parse(localStorage.getItem(UI_STORE));
    if (saved) {
      if (saved.month) ui.month = saved.month;
      if (saved.view && window.innerWidth >= 640) ui.view = saved.view;
    }
  } catch (e) { /* ignore */ }
  const weekStart = k => addDays(k, -fromKey(k).getDay());
  // Point both the month and week views at the period containing date k
  const focusDate = k => { ui.month = k.slice(0, 7); ui.week = weekStart(k); };
  ui.week = weekStart(todayKey().slice(0, 7) === ui.month ? todayKey() : ui.month + '-01');
  const saveUI = () => { try { localStorage.setItem(UI_STORE, JSON.stringify({ month: ui.month, view: ui.view })); } catch (e) { /* ignore */ } };

  const byId = id => posts.find(p => p.id === id);
  const eventById = id => events.find(e => e.id === id);
  const sortPosts = arr => arr.sort((a, b) => (a.date + (a.time || '99')).localeCompare(b.date + (b.time || '99')));
  const isVisible = p =>
    ui.channels.has(p.channel) &&
    (ui.category === 'all' || (p.channel === 'blog' && p.category === ui.category)) &&
    (ui.status === 'all' || p.status === ui.status);
  const inMonth = (k, month = ui.month) => k.slice(0, 7) === month;
  const whenLabel = e => e.when || (e.date ? fmtShort(e.date) : 'Date TBD');
  const eventsOn = k => events.filter(e => e.date === k);
  const eventInMonth = e => e.date ? inMonth(e.date) : (e.window[0].slice(0, 7) <= ui.month && e.window[1].slice(0, 7) >= ui.month);
  const newId = (prefix = 'p') => prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);

  // ── Filters UI ─────────────────────────────────────────────────────
  const channelFilters = $('#channel-filters');
  const catSelect = $('#filter-category');
  const statusSelect = $('#filter-status');
  D.categories.forEach(c => catSelect.insertAdjacentHTML('beforeend', `<option>${esc(c)}</option>`));
  Object.entries(D.statuses).forEach(([k, s]) => statusSelect.insertAdjacentHTML('beforeend', `<option value="${k}">${esc(s.label)}</option>`));
  catSelect.addEventListener('change', () => { ui.category = catSelect.value; render(); });
  statusSelect.addEventListener('change', () => { ui.status = statusSelect.value; render(); });

  function renderFilters() {
    channelFilters.innerHTML = Object.entries(D.channels).map(([k, c]) => {
      const n = posts.filter(p => p.channel === k && inMonth(p.date)).length;
      return `<button type="button" class="filter-chip" data-channel="${k}" aria-pressed="${ui.channels.has(k)}" style="--c:${c.color}">
        <span class="swatch"></span>${esc(c.label)} <span class="count">${n}</span></button>`;
    }).join('');
  }
  channelFilters.addEventListener('click', e => {
    const b = e.target.closest('.filter-chip');
    if (!b) return;
    const k = b.dataset.channel;
    ui.channels.has(k) ? ui.channels.delete(k) : ui.channels.add(k);
    render();
  });

  // Content-type icons (inline so they inherit the channel colour via currentColor)
  const LI_ICON = '<svg viewBox="0 0 48 48" aria-hidden="true"><path fill="currentColor" d="M44.4469 0H3.54375C1.58437 0 0 1.54688 0 3.45938V44.5312C0 46.4437 1.58437 48 3.54375 48H44.4469C46.4062 48 48 46.4438 48 44.5406V3.45938C48 1.54688 46.4062 0 44.4469 0ZM14.2406 40.9031H7.11563V17.9906H14.2406V40.9031ZM10.6781 14.8688C8.39062 14.8688 6.54375 13.0219 6.54375 10.7437C6.54375 8.46562 8.39062 6.61875 10.6781 6.61875C12.9563 6.61875 14.8031 8.46562 14.8031 10.7437C14.8031 13.0125 12.9563 14.8688 10.6781 14.8688ZM40.9031 40.9031H33.7875V29.7656C33.7875 27.1125 33.7406 23.6906 30.0844 23.6906C26.3812 23.6906 25.8187 26.5875 25.8187 29.5781V40.9031H18.7125V17.9906H25.5375V21.1219H25.6312C26.5781 19.3219 28.9031 17.4188 32.3625 17.4188C39.5719 17.4188 40.9031 22.1625 40.9031 28.3313V40.9031Z"/></svg>';
  const ICONS = {
    ive: LI_ICON,
    jj: LI_ICON,
    blog: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M5 2h10l5 5v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm9 1.5V8h4.5L14 3.5ZM7 12v2h10v-2H7Zm0 4v2h7v-2H7Zm0-8v2h4V8H7Z"/></svg>',
    email: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 4h16a2 2 0 0 1 2 2v.35l-10 6.4-10-6.4V6a2 2 0 0 1 2-2Zm-2 4.73 9.46 6.06a1 1 0 0 0 1.08 0L22 8.73V18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.73Z"/></svg>'
  };
  const EVENT_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8 2a1 1 0 0 1 1 1v1h6V3a1 1 0 1 1 2 0v1h1a3 3 0 0 1 3 3v1H3V7a3 3 0 0 1 3-3h1V3a1 1 0 0 1 1-1ZM3 10h18v9a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-9Zm4 3v3h3v-3H7Z"/></svg>';
  const icon = ch => `<span class="type-icon" style="color:${D.channels[ch].color}">${ICONS[ch]}</span>`;
  // Chip icon: the two LinkedIn channels share an icon, so add a tiny IVE / JJ tag
  const chipIcon = ch => (ch === 'ive' || ch === 'jj')
    ? `<span class="type-mark" style="color:${D.channels[ch].color}">${icon(ch)}<span class="type-tag">${esc(D.channels[ch].short)}</span></span>`
    : icon(ch);
  const eventIcon = '<span class="type-icon event-icon">' + EVENT_ICON + '</span>';

  // ── Month view ─────────────────────────────────────────────────────
  const board = $('#board');
  const MAX_CHIPS = 5;
  const expandedDays = new Set();

  function chipHTML(p, detailed) {
    const c = D.channels[p.channel];
    const s = D.statuses[p.status] || D.statuses.idea;
    const dim = ui.event && p.event !== ui.event ? ' dim' : '';
    const hl = ui.event && p.event === ui.event ? ' highlight' : '';
    return `<button type="button" class="chip${dim}${hl}" data-id="${p.id}" style="--c:${c.color}"
        title="${esc(c.label)} · ${esc(p.title)} · ${esc(s.label)}"
        aria-label="${esc(c.short)}: ${esc(p.title)}, ${esc(s.label)}, ${esc(fmtShort(p.date))}">
      ${chipIcon(p.channel)}
      ${detailed
        ? `<span class="chip-body"><span class="chip-meta">${esc([fmtTime(p.time), s.label].filter(Boolean).join(' · '))}</span>
           <span class="chip-title">${esc(p.title)}</span>
           ${p.channel === 'blog' && p.category ? `<span class="chip-meta">${esc(p.category)}</span>` : ''}</span>`
        : `<span class="chip-title">${esc(p.title)}</span>`}
      <span class="status-dot" style="--s:${s.color}"></span>
    </button>`;
  }

  function renderMonth() {
    const [y, m] = ui.month.split('-').map(Number);
    const first = new Date(y, m - 1, 1);
    const start = new Date(y, m - 1, 1 - first.getDay());
    const last = new Date(y, m, 0);
    const end = new Date(y, m - 1, last.getDate() + (6 - last.getDay()));
    const visible = sortPosts(posts.filter(isVisible));
    const tk = todayKey();

    let html = '<div class="cal"><div class="cal-head">' + WEEKDAYS.map(d => `<div>${d}</div>`).join('') + '</div>';
    for (let d = new Date(start); d <= end;) {
      html += '<div class="cal-week">';
      for (let i = 0; i < 7; i++, d.setDate(d.getDate() + 1)) {
        const k = toKey(d);
        const cls = ['day'];
        if (!inMonth(k)) cls.push('other');
        if (k === tk) cls.push('today');
        if (i === 0 || i === 6) cls.push('weekend');
        const dayPosts = visible.filter(p => p.date === k);
        const shown = expandedDays.has(k) ? dayPosts : dayPosts.slice(0, MAX_CHIPS);
        html += `<div class="${cls.join(' ')}" data-date="${k}">
          <div class="day-head"><span class="day-num">${d.getDate()}</span>
            <button type="button" class="day-add" data-add="${k}" aria-label="Add post on ${fmtShort(k)}">+</button></div>
          ${eventsOn(k).map(e => `<button type="button" class="event-pill" data-event="${e.id}" title="${esc(e.name)} · ${esc(e.location)}">${eventIcon}<span>${esc(e.name)}</span></button>`).join('')}
          ${shown.map(p => chipHTML(p)).join('')}
          ${dayPosts.length > shown.length ? `<button type="button" class="more-link" data-more="${k}">+${dayPosts.length - shown.length} more</button>` : ''}
        </div>`;
      }
      html += '</div>';
    }
    board.innerHTML = html + '</div>';
  }

  // ── Week view ──────────────────────────────────────────────────────
  function renderWeek() {
    const visible = sortPosts(posts.filter(isVisible));
    const tk = todayKey();
    let html = '<div class="cal week-view"><div class="cal-week">';
    for (let i = 0; i < 7; i++) {
      const k = addDays(ui.week, i);
      const d = fromKey(k);
      const cls = ['day', 'week-day'];
      if (k === tk) cls.push('today');
      if (i === 0 || i === 6) cls.push('weekend');
      html += `<div class="${cls.join(' ')}" data-date="${k}">
        <div class="wk-head">
          <span class="wk-dow">${WEEKDAYS[i]}</span>
          <span class="day-num">${d.getDate()}</span>
          <button type="button" class="day-add" data-add="${k}" aria-label="Add post on ${fmtShort(k)}">+</button>
        </div>
        ${eventsOn(k).map(e => `<button type="button" class="event-pill" data-event="${e.id}" title="${esc(e.name)} · ${esc(e.location)}">${eventIcon}<span>${esc(e.name)}</span></button>`).join('')}
        ${visible.filter(p => p.date === k).map(p => chipHTML(p, true)).join('')}
      </div>`;
    }
    board.innerHTML = html + '</div></div>';
  }

  function weekTitle() {
    const a = fromKey(ui.week), b = fromKey(addDays(ui.week, 6));
    const mo = d => MONTHS[d.getMonth()].slice(0, 3);
    const range = a.getMonth() === b.getMonth()
      ? `${mo(a)} ${a.getDate()} – ${b.getDate()}`
      : `${mo(a)} ${a.getDate()} – ${mo(b)} ${b.getDate()}`;
    return `${range} <span class="accent">${b.getFullYear()}</span>`;
  }

  // ── List view ──────────────────────────────────────────────────────
  function listRowHTML(p) {
    const c = D.channels[p.channel];
    const s = D.statuses[p.status] || D.statuses.idea;
    const ev = p.event && eventById(p.event);
    const sub = [fmtTime(p.time), p.channel === 'blog' && p.category, p.channel === 'email' && p.subject && `Subject: ${p.subject}`, ev && `↳ ${ev.name}`].filter(Boolean).join(' · ');
    return `<button type="button" class="list-row" data-id="${p.id}" style="--c:${c.color}">
      <span class="ch">${icon(p.channel)}${esc(c.short)}</span>
      <span class="t">${esc(p.title)}${sub ? `<small>${esc(sub)}</small>` : ''}</span>
      <span class="badge"><span class="status-dot" style="--s:${s.color}"></span>${esc(s.label)}</span>
    </button>`;
  }

  function renderList() {
    const visible = sortPosts(posts.filter(p => inMonth(p.date) && isVisible(p) && (!ui.event || p.event === ui.event)));
    const days = [...new Set([...visible.map(p => p.date), ...events.filter(e => e.date && inMonth(e.date) && (!ui.event || e.id === ui.event)).map(e => e.date)])].sort();
    if (!days.length) { board.innerHTML = '<div class="empty">No posts match these filters this month.</div>'; return; }
    const tk = todayKey();
    board.innerHTML = '<div class="list">' + days.map(k => `
      <div class="list-day">
        <div class="list-day-head${k === tk ? ' today' : ''}">
          <span class="date">${esc(fromKey(k).toLocaleDateString('en-US', { month: 'long', day: 'numeric' }))}<small>${WEEKDAYS[fromKey(k).getDay()]}${k === tk ? ' · Today' : ''}</small></span>
          ${eventsOn(k).map(e => `<button type="button" class="badge badge-event event-pill" style="width:auto" data-event="${e.id}">${eventIcon}<span>${esc(e.name)}</span></button>`).join('')}
        </div>
        ${visible.filter(p => p.date === k).map(listRowHTML).join('')}
      </div>`).join('') + '</div>';
  }

  // ── Sidebar ────────────────────────────────────────────────────────
  function renderSidebar() {
    const evs = events.filter(eventInMonth).sort((a, b) => (a.date || a.window[0]).localeCompare(b.date || b.window[0]));
    $('#event-list').innerHTML = evs.length ? evs.map(e => {
      const d = e.date ? fromKey(e.date) : null;
      const n = posts.filter(p => p.event === e.id).length;
      const tbdMonth = !d && MONTHS[fromKey(e.window[0]).getMonth()].slice(0, 3);
      return `<li class="event-li"><button type="button" class="event-item" data-filter-event="${e.id}" aria-pressed="${ui.event === e.id}" title="Highlight linked posts">
        <span class="event-date${d ? '' : ' tbd'}">${d ? `<b>${d.getDate()}</b><span>${MONTHS[d.getMonth()].slice(0, 3)}</span>` : `<b>TBD</b><span>${tbdMonth}</span>`}</span>
        <span><span class="event-name">${esc(e.name)}</span><br>
        <span class="event-meta">${esc(whenLabel(e))}${e.location ? ' · ' + esc(e.location) : ''}<br>${n} linked post${n === 1 ? '' : 's'}</span></span>
      </button>
      <span class="event-actions">
        <button type="button" class="mini-btn" data-edit-event="${e.id}" aria-label="Edit ${esc(e.name)}" title="Edit">✎</button>
        <button type="button" class="mini-btn danger" data-delete-event="${e.id}" aria-label="Delete ${esc(e.name)}" title="Delete">×</button>
      </span></li>`;
    }).join('') : '<li class="event-meta">No events this month.</li>';

    const monthPosts = posts.filter(p => inMonth(p.date));
    const max = Math.max(1, ...Object.keys(D.channels).map(k => monthPosts.filter(p => p.channel === k).length));
    const total = monthPosts.length || 1;
    $('#mix').innerHTML = Object.entries(D.channels).map(([k, c]) => {
      const n = monthPosts.filter(p => p.channel === k).length;
      return `<div class="mix-row" style="--c:${c.color}"><span class="mix-label"><span class="swatch"></span>${esc(c.label)}</span><span class="mix-val">${n}</span>
        <span class="mix-bar"><i style="width:${(n / max) * 100}%"></i></span></div>`;
    }).join('') +
      `<div class="status-bar">${Object.entries(D.statuses).map(([k, s]) => `<i style="width:${(monthPosts.filter(p => p.status === k).length / total) * 100}%;background:${s.color}"></i>`).join('')}</div>
       <div class="status-legend">${Object.entries(D.statuses).map(([k, s]) => `<span><span class="status-dot" style="--s:${s.color}"></span>${esc(s.label)} ${monthPosts.filter(p => p.status === k).length}</span>`).join('')}</div>`;

    const blogs = monthPosts.filter(p => p.channel === 'blog');
    $('#cat-mix').innerHTML = D.categories.map(cat => {
      const n = blogs.filter(p => p.category === cat).length;
      return `<div class="mix-row" style="--c:${D.channels.blog.color}"><span class="mix-label"><span class="swatch"></span>${esc(cat)}</span><span class="mix-val">${n}</span></div>`;
    }).join('');
  }

  // ── Render root ────────────────────────────────────────────────────
  function render() {
    const [y, m] = ui.month.split('-').map(Number);
    $('#month-title').innerHTML = ui.view === 'week' ? weekTitle() : `${MONTHS[m - 1]} <span class="accent">${y}</span>`;
    document.querySelectorAll('.view-toggle button').forEach(b => b.setAttribute('aria-selected', b.dataset.view === ui.view));
    renderFilters();
    ({ month: renderMonth, week: renderWeek, list: renderList })[ui.view]();
    renderSidebar();
    saveUI();
  }

  // ── Navigation ─────────────────────────────────────────────────────
  const shiftMonth = n => {
    if (ui.view === 'week') {
      ui.week = addDays(ui.week, 7 * n);
      ui.month = addDays(ui.week, 3).slice(0, 7);
      return render();
    }
    const [y, m] = ui.month.split('-').map(Number);
    const d = new Date(y, m - 1 + n, 1);
    ui.month = `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
    expandedDays.clear();
    render();
  };
  $('#btn-prev').addEventListener('click', () => shiftMonth(-1));
  $('#btn-next').addEventListener('click', () => shiftMonth(1));
  $('#btn-add-event').addEventListener('click', () => createEvent());
  $('#btn-today').addEventListener('click', () => { focusDate(todayKey()); render(); });
  document.querySelector('.view-toggle').addEventListener('click', e => {
    const b = e.target.closest('button[data-view]');
    if (!b) return;
    // Entering week view: keep the current week if it belongs to this month, else jump to it
    if (b.dataset.view === 'week' && addDays(ui.week, 3).slice(0, 7) !== ui.month) {
      ui.week = weekStart(todayKey().slice(0, 7) === ui.month ? todayKey() : ui.month + '-01');
    }
    ui.view = b.dataset.view;
    render();
  });
  $('#event-list').addEventListener('click', e => {
    const edit = e.target.closest('[data-edit-event]');
    if (edit) return openEvent(edit.dataset.editEvent);
    const del = e.target.closest('[data-delete-event]');
    if (del) return deleteEvent(del.dataset.deleteEvent);
    const b = e.target.closest('[data-filter-event]');
    if (!b) return;
    ui.event = ui.event === b.dataset.filterEvent ? null : b.dataset.filterEvent;
    render();
  });

  // Board clicks: open post / event / add / expand
  let suppressClick = false;
  board.addEventListener('click', e => {
    if (suppressClick) return;
    const t = e.target;
    const chip = t.closest('[data-id]');
    if (chip) return openPost(chip.dataset.id);
    const ev = t.closest('[data-event]');
    if (ev) return openEvent(ev.dataset.event);
    const add = t.closest('[data-add]');
    if (add) return createPost(add.dataset.add);
    const more = t.closest('[data-more]');
    if (more) { expandedDays.add(more.dataset.more); render(); }
  });
  board.addEventListener('dblclick', e => {
    const day = e.target.closest('.day');
    if (day && e.target === day) createPost(day.dataset.date);
  });

  // ── Drag & drop (pointer-based so it works with mouse, pen and touch) ─
  let drag = null;
  let undo = null;
  board.addEventListener('pointerdown', e => {
    const chip = e.target.closest('.chip');
    if (!chip || e.button !== 0) return;
    drag = { id: chip.dataset.id, chip, x: e.clientX, y: e.clientY, started: false, ghost: null, target: null };
  });
  window.addEventListener('pointermove', e => {
    if (!drag) return;
    if (!drag.started) {
      if (Math.hypot(e.clientX - drag.x, e.clientY - drag.y) < 5) return;
      drag.started = true;
      const r = drag.chip.getBoundingClientRect();
      drag.offX = drag.x - r.left; drag.offY = drag.y - r.top;
      drag.ghost = drag.chip.cloneNode(true);
      drag.ghost.classList.add('drag-ghost');
      drag.ghost.style.width = Math.max(r.width, 160) + 'px';
      document.body.appendChild(drag.ghost);
      drag.chip.classList.add('is-dragging');
      document.body.classList.add('dragging');
    }
    drag.ghost.style.left = (e.clientX - drag.offX) + 'px';
    drag.ghost.style.top = (e.clientY - drag.offY) + 'px';
    const cell = document.elementFromPoint(e.clientX, e.clientY)?.closest('.day[data-date]');
    if (cell !== drag.target) {
      drag.target?.classList.remove('drop-target');
      drag.target = cell;
      cell?.classList.add('drop-target');
    }
    // Auto-scroll near viewport edges
    const edge = 60;
    if (e.clientY < edge) window.scrollBy(0, -12);
    else if (e.clientY > window.innerHeight - edge) window.scrollBy(0, 12);
  });
  const endDrag = commit => {
    if (!drag) return;
    if (drag.started) {
      drag.ghost.remove();
      drag.chip.classList.remove('is-dragging');
      document.body.classList.remove('dragging');
      drag.target?.classList.remove('drop-target');
      if (commit && drag.target) movePost(drag.id, drag.target.dataset.date);
      suppressClick = true;
      setTimeout(() => { suppressClick = false; }, 0);
    }
    drag = null;
  };
  window.addEventListener('pointerup', () => endDrag(true));
  window.addEventListener('pointercancel', () => endDrag(false));
  window.addEventListener('keydown', e => { if (e.key === 'Escape' && drag) endDrag(false); });

  // Keyboard move: Alt + arrows on a focused chip
  board.addEventListener('keydown', e => {
    const chip = e.target.closest('.chip');
    if (!chip || !e.altKey) return;
    const delta = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key];
    if (!delta) return;
    e.preventDefault();
    const p = byId(chip.dataset.id);
    const to = addDays(p.date, delta);
    movePost(p.id, to, true);
    focusDate(to); render();
    board.querySelector(`.chip[data-id="${p.id}"]`)?.focus();
  });

  function movePost(id, date, quiet) {
    const p = byId(id);
    if (!p || p.date === date) return;
    const from = p.date;
    p.date = date;
    save();
    render();
    if (!quiet) toast(`Moved “${p.title}” to ${fmtShort(date)}`, () => { p.date = from; save(); render(); });
  }

  // ── Toast ──────────────────────────────────────────────────────────
  const toastEl = $('#toast');
  let toastTimer;
  function toast(msg, onUndo) {
    clearTimeout(toastTimer);
    undo = onUndo || null;
    toastEl.innerHTML = `<span>${esc(msg)}</span>${onUndo ? '<button type="button">Undo</button>' : ''}`;
    toastEl.hidden = false;
    toastTimer = setTimeout(() => { toastEl.hidden = true; undo = null; }, 5000);
  }
  toastEl.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON' && undo) { undo(); undo = null; toastEl.hidden = true; }
  });

  // ── Previews ───────────────────────────────────────────────────────
  // p.image: undefined → channel placeholder, 'custom' → uploaded (IndexedDB), 'none' → removed
  const hasCustom = p => p.image === 'custom';
  function postImg(p, cls, alt) {
    if (p.image === 'none') return '';
    const url = (p === draft && draftImageURL) || imageURLs.get(p.id);
    if (hasCustom(p) && url) {
      const [w, h] = p.imageSize || [];
      return `<img class="${cls}" src="${url}"${w ? ` width="${w}" height="${h}"` : ''} alt="${esc(alt)}">`;
    }
    const c = D.channels[p.channel];
    return `<img class="${cls}" src="${c.image}" width="${c.size[0]}" height="${c.size[1]}" alt="${esc(alt)} placeholder">`;
  }
  const noImage = '<div class="no-image">No image</div>';
  const shotLabel = (p, what) => p.image === 'none' ? '' : `<div class="shot-label">${hasCustom(p) ? esc(p.imageName || 'Uploaded image') : `Layout placeholder — scroll to preview the full ${what} template`}</div>`;
  function formatCopy(text) {
    return esc(text || '')
      .replace(/\[([^\]]*)\]/g, '<span class="ph">[$1]</span>')
      .replace(/(^|\s)(#[\w]+)/g, '$1<span class="tag">$2</span>');
  }
  const LI_STATS = `<div class="li-stats"><span class="rx"><b style="background:#378FE9">👍</b><b style="background:#DF704D;margin-left:-6px">❤</b> &nbsp;Reactions</span><span>Comments · Reposts</span></div>
    <div class="li-actions"><span>Like</span><span>Comment</span><span>Repost</span><span>Send</span></div>`;

  function previewLinkedIn(p) {
    const isJJ = p.channel === 'jj';
    const avatar = isJJ
      ? `<img class="li-avatar round" src="${D.channels.jj.image}" alt="">`
      : `<span class="li-avatar brand">In<i>•</i>VE</span>`;
    const name = isJJ ? 'James “J.J.” Eden <span class="deg">· 1st</span>' : 'In-Vehicle Evolution';
    const sub = isJJ ? 'Executive Director, North Carolina Turnpike Authority' : 'Evolving the journey with trusted, frictionless in-vehicle payments';
    const when = `${fmtShort(p.date)}${p.time ? ' · ' + fmtTime(p.time) : ''} · 🌐`;
    return `<article class="li">
      <header class="li-head">${avatar}
        <div class="li-who"><div class="li-name">${name}</div><div class="li-sub">${esc(sub)}</div><div class="li-sub">${esc(when)}</div></div>
        <span class="li-follow">${isJJ ? '' : '+ Follow'}</span>
      </header>
      <div class="li-copy">${formatCopy(p.copy) || '<span style="color:#999">Post copy will appear here…</span>'}</div>
      ${postImg(p, 'li-img', 'Post image')}
      ${LI_STATS}
    </article>`;
  }

  const slug = t => (t || 'untitled').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
  function previewBlog(p) {
    return `<div class="frame">
      <div class="frame-bar"><span class="frame-dots"><i></i><i></i><i></i></span><span class="frame-url">invehicleevolution.com/${esc(slug(p.title))}/</span></div>
      <div class="blog-hero">
        ${p.category ? `<span class="badge badge-pink">${esc(p.category)}</span>` : ''}
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.copy || '')}</p>
        <div class="by"><img src="${D.channels.jj.image}" alt=""> JJ Eden · ${esc(fmtShort(p.date))}, ${fromKey(p.date).getFullYear()}</div>
      </div>
      ${p.image === 'none' ? noImage : `<div class="scroll-shot">${postImg(p, '', 'Blog image')}</div>`}
      ${shotLabel(p, 'blog')}
    </div>`;
  }

  function previewEmail(p) {
    return `<div class="frame">
      <div class="frame-bar"><span class="frame-dots"><i></i><i></i><i></i></span><span class="frame-url">Inbox</span></div>
      <dl class="mail-meta">
        <dt>From</dt><dd>In-Vehicle Evolution</dd>
        <dt>Subject</dt><dd class="subj">${esc(p.subject || p.title)}</dd>
        <dt>Preview</dt><dd>${esc(p.preheader || '—')}</dd>
        <dt>Send</dt><dd>${esc(fmtLong(p.date))}${p.time ? ' · ' + esc(fmtTime(p.time)) : ''}</dd>
      </dl>
      ${p.image === 'none' ? noImage : `<div class="mail-shot"><div class="scroll-shot">${postImg(p, '', 'Email image')}</div></div>`}
      ${shotLabel(p, 'email')}
    </div>`;
  }

  const previewFor = p => p.channel === 'blog' ? previewBlog(p) : p.channel === 'email' ? previewEmail(p) : previewLinkedIn(p);

  // ── Post images (stored as blobs in IndexedDB; localStorage is too small) ─
  const imageURLs = new Map();
  let dbPromise;
  function db() {
    const open = version => new Promise((resolve, reject) => {
      const req = indexedDB.open('ive-content-planner-v3', version);
      req.onupgradeneeded = () => { if (!req.result.objectStoreNames.contains('images')) req.result.createObjectStore('images'); };
      req.onsuccess = () => {
        const d = req.result;
        // Recover if the database exists without its image store
        if (d.objectStoreNames.contains('images')) return resolve(d);
        const next = d.version + 1;
        d.close();
        open(next).then(resolve, reject);
      };
      req.onerror = () => reject(req.error);
    });
    dbPromise = dbPromise || open();
    return dbPromise;
  }
  async function idb(mode, fn) {
    const d = await db();
    return new Promise((resolve, reject) => {
      const tx = d.transaction('images', mode);
      const req = fn(tx.objectStore('images'));
      tx.oncomplete = () => resolve(req && req.result);
      tx.onerror = () => reject(tx.error);
    });
  }
  const getImage = id => idb('readonly', s => s.get(id));
  const putImage = (id, blob) => idb('readwrite', s => s.put(blob, id));
  const deleteImage = id => idb('readwrite', s => s.delete(id));
  function cacheURL(id, blob) {
    if (imageURLs.has(id)) URL.revokeObjectURL(imageURLs.get(id));
    if (blob) imageURLs.set(id, URL.createObjectURL(blob)); else imageURLs.delete(id);
  }
  async function loadImages() {
    await Promise.all(posts.filter(hasCustom).map(async p => {
      try { const b = await getImage(p.id); if (b) cacheURL(p.id, b); } catch (e) { /* ignore */ }
    }));
    if (draft && hasCustom(draft) && !draftImageURL) refreshModal(draft, true);
  }

  function imageFieldHTML(p) {
    const status = hasCustom(p) ? (p.imageName || 'Uploaded image') : p.image === 'none' ? 'No image' : 'Placeholder image';
    const thumb = p.image === 'none' ? '<span class="img-empty">No image</span>' : postImg(p, '', 'Thumbnail');
    return `<div class="img-field" data-drop>
      <div class="img-thumb">${thumb}</div>
      <div class="img-info">
        <span class="img-status">${esc(status)}</span>
        <span class="img-actions">
          <label class="btn btn-ghost btn-sm">${p.image === 'none' ? 'Upload' : 'Replace'}<input type="file" accept="image/*" data-img-input hidden></label>
          ${p.image === 'none'
            ? '<button type="button" class="btn btn-ghost btn-sm" data-act="img-placeholder">Use placeholder</button>'
            : '<button type="button" class="btn btn-danger btn-sm" data-act="img-delete">Delete</button>'}
        </span>
        <span class="img-hint">or drop an image here</span>
      </div>
    </div>`;
  }

  // Image changes are staged on the draft and only written to IndexedDB on Save
  async function setPostImage(file) {
    if (!draft) return;
    if (!file || !file.type.startsWith('image/')) return toast('Please choose an image file');
    let size;
    try { const bmp = await createImageBitmap(file); size = [bmp.width, bmp.height]; bmp.close(); } catch (e) { /* SVG etc. */ }
    setDraftImageURL(file);
    pendingImage = { blob: file };
    Object.assign(draft, { image: 'custom', imageName: file.name, imageSize: size });
    if (!size) delete draft.imageSize;
    markDirty(true);
  }

  function removePostImage() {
    setDraftImageURL(null);
    pendingImage = { blob: null };
    draft.image = 'none'; delete draft.imageName; delete draft.imageSize;
    markDirty(true);
  }

  function usePlaceholder() {
    setDraftImageURL(null);
    pendingImage = { blob: null };
    delete draft.image; delete draft.imageName; delete draft.imageSize;
    markDirty(true);
  }

  function setDraftImageURL(blob) {
    if (draftImageURL) URL.revokeObjectURL(draftImageURL);
    draftImageURL = blob ? URL.createObjectURL(blob) : null;
  }

  // ── Post modal ─────────────────────────────────────────────────────
  const modal = $('#modal');
  const unsavedDialog = $('#unsaved');
  let current = null;
  let currentEvent = null;
  // Post edits happen on a draft copy; nothing is stored until Save.
  let draft = null;
  let isNewPost = false;
  let dirty = false;
  let pendingImage = null;    // { blob } staged upload (blob) or removal (null)
  let draftImageURL = null;

  function markDirty(rebuildEditor) {
    dirty = true;
    refreshModal(draft, rebuildEditor);
    updateSaveState();
  }
  function saveNote() { return dirty ? 'Unsaved changes' : (isNewPost ? 'New post: not saved yet' : 'All changes saved'); }
  function updateSaveState() {
    const btn = $('[data-act="save"]', modal);
    const note = $('.saved-note', modal);
    if (btn) btn.disabled = !dirty;
    if (note) { note.textContent = saveNote(); note.classList.toggle('is-dirty', dirty); }
  }

  function orderedVisible() { return sortPosts(posts.filter(isVisible)); }

  function editorHTML(p) {
    const opt = (v, l, sel) => `<option value="${esc(v)}"${v === sel ? ' selected' : ''}>${esc(l)}</option>`;
    const copyLabel = { ive: 'Post copy', jj: 'Post copy', blog: 'Excerpt / summary', email: 'Body summary' }[p.channel];
    const limit = p.channel === 'ive' || p.channel === 'jj' ? `<em data-count>${(p.copy || '').length} / 3,000</em>` : '';
    return `
      <label class="field"><span>Title</span><input type="text" name="title" value="${esc(p.title)}"></label>
      <div class="field-row">
        <label class="field"><span>Channel</span><select name="channel">${Object.entries(D.channels).map(([k, c]) => opt(k, c.label, p.channel)).join('')}</select></label>
        <label class="field"><span>Status</span><select name="status">${Object.entries(D.statuses).map(([k, s]) => opt(k, s.label, p.status)).join('')}</select></label>
      </div>
      <div class="field-row">
        <label class="field"><span>Publish date</span><input type="date" name="date" value="${esc(p.date)}"></label>
        <label class="field"><span>Time</span><input type="time" name="time" value="${esc(p.time || '')}"></label>
      </div>
      ${p.channel === 'blog' ? `<label class="field"><span>Blog category</span><select name="category">${opt('', 'Choose…', p.category || '')}${D.categories.map(c => opt(c, c, p.category)).join('')}</select></label>` : ''}
      ${p.channel === 'email' ? `
        <label class="field"><span>Subject line <em data-subj>${(p.subject || '').length} chars</em></span><input type="text" name="subject" value="${esc(p.subject || '')}"></label>
        <label class="field"><span>Preheader</span><input type="text" name="preheader" value="${esc(p.preheader || '')}"></label>
        <label class="field"><span>Primary CTA</span><input type="text" name="cta" value="${esc(p.cta || '')}"></label>` : ''}
      <div class="field"><span>Image</span>${imageFieldHTML(p)}</div>
      <label class="field"><span>Related event</span><select name="event">${opt('', 'None', p.event || '')}${events.map(e => opt(e.id, `${e.name} (${whenLabel(e)})`, p.event)).join('')}</select></label>
      <label class="field"><span>${copyLabel} ${limit}</span><textarea name="copy" class="${p.channel === 'ive' || p.channel === 'jj' ? 'tall' : ''}">${esc(p.copy || '')}</textarea></label>
      <label class="field"><span>Notes</span><textarea name="notes" placeholder="Assets, approvals, links…">${esc(p.notes || '')}</textarea></label>
      <div class="editor-foot">
        <span class="foot-left">
          <button type="button" class="btn btn-primary btn-save" data-act="save"${dirty ? '' : ' disabled'}>Save</button>
          <span class="saved-note${dirty ? ' is-dirty' : ''}">${saveNote()}</span>
        </span>
        <span style="display:flex;gap:8px">
          <button type="button" class="btn btn-ghost btn-sm" data-act="duplicate"${isNewPost ? ' disabled' : ''}>Duplicate</button>
          <button type="button" class="btn btn-danger btn-sm" data-act="delete">${isNewPost ? 'Discard' : 'Delete'}</button>
        </span>
      </div>`;
  }

  function headHTML(p) {
    const c = D.channels[p.channel];
    const list = orderedVisible();
    const i = list.findIndex(x => x.id === p.id);
    return `<span class="ch-badge">${icon(p.channel)}${esc(c.label)}</span>
      <h2 id="modal-title">${esc(fmtLong(p.date))}</h2>
      <div class="modal-nav">
        <button type="button" class="icon-btn" data-act="prev" aria-label="Previous post"${i <= 0 ? ' disabled' : ''}>‹</button>
        <span class="pos">${i >= 0 ? `${i + 1} / ${list.length}` : ''}</span>
        <button type="button" class="icon-btn" data-act="next" aria-label="Next post"${i < 0 || i >= list.length - 1 ? ' disabled' : ''}>›</button>
        <button type="button" class="icon-btn" data-act="close" aria-label="Close">×</button>
      </div>`;
  }

  function openPost(id, newPost) {
    const p = newPost || byId(id);
    if (!p) return;
    current = p.id;
    currentEvent = null;
    draft = clone(p);
    isNewPost = !!newPost;
    dirty = false;
    pendingImage = null;
    setDraftImageURL(null);
    modal.innerHTML = `<div class="modal-head">${headHTML(draft)}</div>
      <div class="modal-body">
        <div class="preview-pane" id="preview">${previewFor(draft)}</div>
        <form class="editor" id="editor" autocomplete="off">${editorHTML(draft)}</form>
      </div>`;
    if (!modal.open) modal.showModal();
    if (!isNewPost) history.replaceState(null, '', '#post=' + p.id);
  }

  async function savePost() {
    if (!draft) return false;
    try {
      if (pendingImage) {
        if (pendingImage.blob) { await putImage(draft.id, pendingImage.blob); cacheURL(draft.id, pendingImage.blob); }
        else { await deleteImage(draft.id).catch(() => {}); cacheURL(draft.id, null); }
      }
    } catch (e) {
      toast('Could not save the image in this browser');
      return false;
    }
    let p = byId(draft.id);
    if (!p) { p = {}; posts.push(p); }
    Object.keys(p).forEach(k => delete p[k]);
    Object.assign(p, clone(draft));
    save();
    const wasNew = isNewPost;
    isNewPost = false;
    dirty = false;
    pendingImage = null;
    setDraftImageURL(null);
    focusDate(p.date);
    render();
    if (modal.open && current === p.id) {
      refreshModal(draft, true);
      if (wasNew) history.replaceState(null, '', '#post=' + p.id);
    }
    toast('Changes saved');
    return true;
  }

  // Run `leave` now, or after the person chooses Save / Exit in the warning
  let pendingLeave = null;
  function guardLeave(leave) {
    if (!draft || !dirty) return leave();
    pendingLeave = leave;
    $('#unsaved-title', unsavedDialog).textContent = draft.title || 'this post';
    unsavedDialog.showModal();
    $('[data-unsaved="save"]', unsavedDialog).focus();
  }
  function discardDraft() {
    dirty = false;
    pendingImage = null;
    setDraftImageURL(null);
  }
  unsavedDialog.addEventListener('click', async e => {
    const choice = e.target.closest('[data-unsaved]')?.dataset.unsaved;
    if (!choice && e.target !== unsavedDialog) return;
    const leave = pendingLeave;
    pendingLeave = null;
    unsavedDialog.close();
    if (choice === 'save') { if (!(await savePost())) return; }
    else if (choice === 'exit') discardDraft();
    else return;               // backdrop click: keep editing
    leave && leave();
  });
  // Escape on the warning returns to editing
  unsavedDialog.addEventListener('cancel', () => { pendingLeave = null; });
  // Escape on the editor goes through the same check
  modal.addEventListener('cancel', e => {
    if (draft && dirty) { e.preventDefault(); guardLeave(() => modal.close()); }
  });
  window.addEventListener('beforeunload', e => {
    if (draft && dirty) { e.preventDefault(); e.returnValue = ''; }
  });

  function refreshModal(p, rebuildEditor) {
    $('.modal-head', modal).innerHTML = headHTML(p);
    $('#preview', modal).innerHTML = previewFor(p);
    if (rebuildEditor) $('#editor', modal).innerHTML = editorHTML(p);
  }

  modal.addEventListener('input', e => {
    const f = e.target;
    if (f.closest('#event-editor')) return updateEvent(f);
    if (!f.name || !draft || !f.closest('#editor')) return;
    if (f.name === 'date' && !f.value) return;
    draft[f.name] = f.value;
    if (f.name === 'copy') { const c = $('[data-count]', modal); if (c) c.textContent = `${f.value.length.toLocaleString()} / 3,000`; }
    if (f.name === 'subject') { const c = $('[data-subj]', modal); if (c) c.textContent = `${f.value.length} chars`; }
    if (f.name === 'channel' && draft.channel !== 'blog') delete draft.category;
    markDirty(f.name === 'channel');
  });

  modal.addEventListener('click', e => {
    if (e.target === modal) return guardLeave(() => modal.close()); // backdrop
    const act = e.target.closest('[data-act]')?.dataset.act;
    if (!act) return;
    if (act === 'close') return guardLeave(() => modal.close());
    if (act === 'save') return savePost();
    if (act === 'prev' || act === 'next') {
      const list = orderedVisible();
      const i = list.findIndex(x => x.id === current);
      const next = list[i + (act === 'next' ? 1 : -1)];
      if (next) guardLeave(() => { focusDate(next.date); render(); openPost(next.id); });
      return;
    }
    if (act === 'img-delete') return removePostImage();
    if (act === 'img-placeholder') return usePlaceholder();
    if (act === 'duplicate') {
      if (dirty) return toast('Save your changes before duplicating');
      const src = byId(current);
      const copy = { ...clone(src), id: newId(), title: src.title + ' (copy)', status: 'idea' };
      posts.push(copy); save(); render(); openPost(copy.id);
      // Give the copy its own stored image so deleting one doesn't affect the other
      if (hasCustom(src)) {
        getImage(src.id).then(b => b && putImage(copy.id, b).then(() => { cacheURL(copy.id, b); if (current === copy.id) refreshModal(copy, true); }))
          .catch(() => {});
      }
      toast('Post duplicated');
      return;
    }
    if (act === 'delete') {
      if (isNewPost) { discardDraft(); return modal.close(); }
      const p = byId(current);
      if (!confirm(`Delete “${p.title}”?`)) return;
      discardDraft();
      const idx = posts.indexOf(p);
      posts.splice(idx, 1); save(); modal.close(); render();
      toast('Post deleted', () => { posts.splice(idx, 0, p); save(); render(); });
      return;
    }
    if (act === 'open') { openPost(e.target.closest('[data-id]').dataset.id); }
    if (act === 'delete-event') { const id = currentEvent; modal.close(); deleteEvent(id); }
  });
  modal.addEventListener('change', e => {
    if (e.target.matches('[data-img-input]') && draft) setPostImage(e.target.files[0]);
  });
  modal.addEventListener('dragover', e => {
    const zone = e.target.closest('[data-drop]');
    if (!zone || !e.dataTransfer.types.includes('Files')) return;
    e.preventDefault();
    zone.classList.add('drag-over');
  });
  modal.addEventListener('dragleave', e => e.target.closest('[data-drop]')?.classList.remove('drag-over'));
  modal.addEventListener('drop', e => {
    const zone = e.target.closest('[data-drop]');
    if (!zone) return;
    e.preventDefault();
    zone.classList.remove('drag-over');
    if (draft) setPostImage(e.dataTransfer.files[0]);
  });
  modal.addEventListener('keydown', e => {
    // Cmd/Ctrl + S saves the open post
    if (draft && (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') { e.preventDefault(); if (dirty) savePost(); return; }
    if (!current || ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
    if (e.key === 'ArrowRight') $('[data-act="next"]', modal)?.click();
    if (e.key === 'ArrowLeft') $('[data-act="prev"]', modal)?.click();
  });
  modal.addEventListener('close', () => {
    if (modal.open) return;
    current = null;
    currentEvent = null;
    draft = null;
    isNewPost = false;
    discardDraft();
    history.replaceState(null, '', location.pathname + location.search);
  });

  function createPost(date) {
    const first = [...ui.channels][0] || 'ive';
    const p = { id: newId(), channel: first, date, time: '09:00', status: 'idea', event: '', title: 'Untitled post', copy: '', notes: '' };
    if (first === 'blog') p.category = ui.category !== 'all' ? ui.category : '';
    openPost(p.id, p);
    setTimeout(() => { const t = $('input[name="title"]', modal); t?.focus(); t?.select(); }, 30);
  }
  $('#btn-new').addEventListener('click', () => {
    const tk = todayKey();
    createPost(inMonth(tk) ? tk : ui.month + '-01');
  });

  // ── Event modal (view, edit, delete) ───────────────────────────────
  const monthEnd = ym => { const [y, m] = ym.split('-').map(Number); return toKey(new Date(y, m, 0)); };

  function eventFormHTML(e) {
    const tbd = !e.date;
    const month = (e.window ? e.window[0] : ui.month + '-01').slice(0, 7);
    return `<form class="event-form" id="event-editor" autocomplete="off">
        <label class="field"><span>Event name</span><input type="text" name="name" value="${esc(e.name)}"></label>
        <label class="check"><input type="checkbox" name="tbd"${tbd ? ' checked' : ''}> Date not confirmed yet (TBD)</label>
        <div class="field-row">
          ${tbd
            ? `<label class="field"><span>Month</span><input type="month" name="month" value="${esc(month)}"></label>
               <label class="field"><span>Timing note</span><input type="text" name="when" value="${esc(e.when || '')}" placeholder="e.g. Mid–Late October"></label>`
            : `<label class="field"><span>Date</span><input type="date" name="date" value="${esc(e.date)}"></label>
               <span></span>`}
        </div>
        <label class="field"><span>Location</span><input type="text" name="location" value="${esc(e.location || '')}" placeholder="City, venue or Online"></label>
        <label class="field"><span>Website</span><input type="text" name="url" value="${esc(e.url || '')}" placeholder="https://"></label>
      </form>`;
  }

  function linkedHTML(id) {
    const linked = sortPosts(posts.filter(p => p.event === id));
    return `<h3>Linked content (${linked.length})</h3>
      ${linked.length ? `<div class="list-day">${linked.map(p => listRowHTML(p).replace('class="list-row"', 'class="list-row" data-act="open"')).join('')}</div>`
        : '<div class="empty">No content linked yet. Open a post and set its Related event.</div>'}`;
  }

  function openEvent(id) {
    const e = eventById(id);
    if (!e) return;
    current = null;
    currentEvent = id;
    modal.innerHTML = `<div class="modal-head">
        <span class="ch-badge" style="color:var(--gold)">${eventIcon}Event</span>
        <h2 id="modal-title">${esc(e.name)}</h2>
        <div class="modal-nav"><button type="button" class="icon-btn" data-act="close" aria-label="Close">×</button></div>
      </div>
      <div class="event-detail">
        <div class="event-detail-grid">
          <div>${eventFormHTML(e)}
            ${e.url ? `<p class="event-link"><a href="${esc(e.url)}" target="_blank" rel="noopener">Open event website ↗</a></p>` : ''}
          </div>
          <div id="event-linked">${linkedHTML(id)}</div>
        </div>
        <div class="editor-foot">
          <span class="saved-note">Changes save automatically</span>
          <button type="button" class="btn btn-danger btn-sm" data-act="delete-event">Delete event</button>
        </div>
      </div>`;
    if (!modal.open) modal.showModal();
  }

  function updateEvent(f) {
    const e = eventById(currentEvent);
    if (!e || !f.name) return;
    if (f.name === 'tbd') {
      if (f.checked) {
        const ym = (e.date || ui.month + '-01').slice(0, 7);
        e.window = [ym + '-01', monthEnd(ym)];
        e.tentative = true;
        delete e.date;
      } else {
        e.date = e.window ? e.window[0] : ui.month + '-01';
        delete e.window; delete e.when; delete e.tentative;
      }
      $('#event-editor', modal).outerHTML = eventFormHTML(e);
    } else if (f.name === 'month') {
      if (!f.value) return;
      e.window = [f.value + '-01', monthEnd(f.value)];
      focusDate(f.value + '-01');
    } else if (f.name === 'date') {
      if (!f.value) return;
      e.date = f.value;
      focusDate(f.value);
    } else {
      e[f.name] = f.value.trim() ? f.value : '';
      if (f.name === 'name') $('#modal-title', modal).textContent = f.value || 'Untitled event';
    }
    save();
    render();
  }

  function createEvent() {
    const tk = todayKey();
    const e = { id: newId('e'), name: 'New event', date: inMonth(tk) ? tk : ui.month + '-01', location: '' };
    events.push(e);
    save(); render(); openEvent(e.id);
    setTimeout(() => { const t = $('input[name="name"]', modal); t?.focus(); t?.select(); }, 30);
  }

  function deleteEvent(id) {
    const e = eventById(id);
    if (!e) return;
    const linked = posts.filter(p => p.event === id);
    const note = linked.length ? `\n\n${linked.length} linked post${linked.length === 1 ? '' : 's'} will be kept but unlinked.` : '';
    if (!confirm(`Delete “${e.name}”?${note}`)) return;
    const idx = events.indexOf(e);
    events.splice(idx, 1);
    linked.forEach(p => { p.event = ''; });
    if (ui.event === id) ui.event = null;
    save(); render();
    toast('Event deleted', () => {
      events.splice(idx, 0, e);
      linked.forEach(p => { p.event = id; });
      save(); render();
    });
  }

  // ── Boot ───────────────────────────────────────────────────────────
  render();
  loadImages();
  const m = location.hash.match(/^#post=(.+)$/);
  if (m && byId(m[1])) { focusDate(byId(m[1]).date); render(); openPost(m[1]); }
})();
