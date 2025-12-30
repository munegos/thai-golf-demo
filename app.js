<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta http-equiv="Content-Style-Type" content="text/css">
  <title></title>
  <meta name="Generator" content="Cocoa HTML Writer">
  <meta name="CocoaVersion" content="2575.2">
  <style type="text/css">
    p.p1 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica; min-height: 14.0px}
    p.p2 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica}
  </style>
</head>
<body>
<p class="p1"><br></p>
<p class="p2">const GAS_ENDPOINT = "https://script.google.com/macros/s/AKfycbzT5aenhX39j09fPMnKkPtY12_n1LMMm8RHm4r1n_h81UVa_sNeqohg1nKXrYU7RFLB/exec";</p>
<p class="p1"><br></p>
<p class="p1"><br></p>
<p class="p2">const $ = (q, el=document) =&gt; el.querySelector(q);</p>
<p class="p2">const $$ = (q, el=document) =&gt; Array.from(el.querySelectorAll(q));</p>
<p class="p1"><br></p>
<p class="p2">const state = {</p>
<p class="p2"><span class="Apple-converted-space">  </span>calendarCursor: new Date(),</p>
<p class="p2"><span class="Apple-converted-space">  </span>selectedDate: null,</p>
<p class="p2"><span class="Apple-converted-space">  </span>selectedArea: "Bangkok",</p>
<p class="p2"><span class="Apple-converted-space">  </span>purpose: null,</p>
<p class="p2"><span class="Apple-converted-space">  </span>options: {</p>
<p class="p2"><span class="Apple-converted-space">    </span>Rental: false,</p>
<p class="p2"><span class="Apple-converted-space">    </span>FastTrack: false,</p>
<p class="p2"><span class="Apple-converted-space">  </span>}</p>
<p class="p2">};</p>
<p class="p1"><br></p>
<p class="p2">// ------------------------------</p>
<p class="p2">// Demo datasets for purpose/area cards</p>
<p class="p2">// ------------------------------</p>
<p class="p2">const COURSE_LIBRARY = [</p>
<p class="p2"><span class="Apple-converted-space">  </span>{ name:"Alpine Prestige Club", area:"Bangkok", tags:["Championship","Long","Modern"], purposes:["Serious","Luxury"] },</p>
<p class="p2"><span class="Apple-converted-space">  </span>{ name:"Riverside Signature", area:"Bangkok", tags:["Friendly","Flat","Fast"], purposes:["Beginner","Caddie"] },</p>
<p class="p2"><span class="Apple-converted-space">  </span>{ name:"Royal Heritage Golf", area:"Pattaya", tags:["Premium","Ocean","Service"], purposes:["Luxury","Caddie"] },</p>
<p class="p2"><span class="Apple-converted-space">  </span>{ name:"Ocean View Resort Links", area:"Pattaya", tags:["Resort","Wide","Relax"], purposes:["Beginner","Luxury"] },</p>
<p class="p2"><span class="Apple-converted-space">  </span>{ name:"HuaHin Classic", area:"HuaHin", tags:["Classic","Quiet","Value"], purposes:["Caddie","Beginner"] },</p>
<p class="p2"><span class="Apple-converted-space">  </span>{ name:"Mountain Breeze ChiangMai", area:"ChiangMai", tags:["Highland","Cool","Scenic"], purposes:["Serious","Luxury"] },</p>
<p class="p2">];</p>
<p class="p1"><br></p>
<p class="p2">// ------------------------------</p>
<p class="p2">// Hero quick search</p>
<p class="p2">// ------------------------------</p>
<p class="p2">init();</p>
<p class="p1"><br></p>
<p class="p2">function init(){</p>
<p class="p2"><span class="Apple-converted-space">  </span>// Set quick search date default: tomorrow</p>
<p class="p2"><span class="Apple-converted-space">  </span>const tomorrow = new Date();</p>
<p class="p2"><span class="Apple-converted-space">  </span>tomorrow.setDate(tomorrow.getDate() + 1);</p>
<p class="p2"><span class="Apple-converted-space">  </span>$("#quickSearchForm input[name='date']").value = isoDate(tomorrow);</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">  </span>// Calendar init</p>
<p class="p2"><span class="Apple-converted-space">  </span>renderCalendar();</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">  </span>// Calendar nav</p>
<p class="p2"><span class="Apple-converted-space">  </span>$("#prevMonth").addEventListener("click", () =&gt; {</p>
<p class="p2"><span class="Apple-converted-space">    </span>state.calendarCursor.setMonth(state.calendarCursor.getMonth() - 1);</p>
<p class="p2"><span class="Apple-converted-space">    </span>renderCalendar();</p>
<p class="p2"><span class="Apple-converted-space">  </span>});</p>
<p class="p2"><span class="Apple-converted-space">  </span>$("#nextMonth").addEventListener("click", () =&gt; {</p>
<p class="p2"><span class="Apple-converted-space">    </span>state.calendarCursor.setMonth(state.calendarCursor.getMonth() + 1);</p>
<p class="p2"><span class="Apple-converted-space">    </span>renderCalendar();</p>
<p class="p2"><span class="Apple-converted-space">  </span>});</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">  </span>// Slots area dropdown</p>
<p class="p2"><span class="Apple-converted-space">  </span>$("#slotsArea").addEventListener("change", (e) =&gt; {</p>
<p class="p2"><span class="Apple-converted-space">    </span>state.selectedArea = e.target.value;</p>
<p class="p2"><span class="Apple-converted-space">    </span>if (state.selectedDate) loadAvailability(state.selectedDate, state.selectedArea);</p>
<p class="p2"><span class="Apple-converted-space">  </span>});</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">  </span>// Floating CTA</p>
<p class="p2"><span class="Apple-converted-space">  </span>$("#floatingCtaBtn").addEventListener("click", () =&gt; scrollToId("calendar"));</p>
<p class="p2"><span class="Apple-converted-space">  </span>$("#openQuickSearch").addEventListener("click", () =&gt; scrollToId("calendar"));</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">  </span>// Quick search form -&gt; jump to calendar and load availability</p>
<p class="p2"><span class="Apple-converted-space">  </span>$("#quickSearchForm").addEventListener("submit", (e) =&gt; {</p>
<p class="p2"><span class="Apple-converted-space">    </span>e.preventDefault();</p>
<p class="p2"><span class="Apple-converted-space">    </span>const fd = new FormData(e.currentTarget);</p>
<p class="p2"><span class="Apple-converted-space">    </span>const date = fd.get("date");</p>
<p class="p2"><span class="Apple-converted-space">    </span>const area = fd.get("area");</p>
<p class="p2"><span class="Apple-converted-space">    </span>state.selectedArea = area;</p>
<p class="p2"><span class="Apple-converted-space">    </span>$("#slotsArea").value = area;</p>
<p class="p2"><span class="Apple-converted-space">    </span>selectDate(date);</p>
<p class="p2"><span class="Apple-converted-space">    </span>scrollToId("calendar");</p>
<p class="p2"><span class="Apple-converted-space">  </span>});</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">  </span>// Purpose cards</p>
<p class="p2"><span class="Apple-converted-space">  </span>$$(".pillCard").forEach(btn =&gt; {</p>
<p class="p2"><span class="Apple-converted-space">    </span>btn.addEventListener("click", () =&gt; {</p>
<p class="p2"><span class="Apple-converted-space">      </span>const purpose = btn.dataset.purpose;</p>
<p class="p2"><span class="Apple-converted-space">      </span>state.purpose = purpose;</p>
<p class="p2"><span class="Apple-converted-space">      </span>$("#purposeSub").textContent = labelPurpose(purpose) + " のおすすめ";</p>
<p class="p2"><span class="Apple-converted-space">      </span>renderPurposeResults(purpose);</p>
<p class="p2"><span class="Apple-converted-space">    </span>});</p>
<p class="p2"><span class="Apple-converted-space">  </span>});</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">  </span>// Area cards</p>
<p class="p2"><span class="Apple-converted-space">  </span>$$(".areaCard").forEach(btn =&gt; {</p>
<p class="p2"><span class="Apple-converted-space">    </span>btn.addEventListener("click", () =&gt; {</p>
<p class="p2"><span class="Apple-converted-space">      </span>const area = btn.dataset.area;</p>
<p class="p2"><span class="Apple-converted-space">      </span>$("#areaSub").textContent = labelArea(area) + " のおすすめ";</p>
<p class="p2"><span class="Apple-converted-space">      </span>renderAreaResults(area);</p>
<p class="p2"><span class="Apple-converted-space">      </span>$("#slotsArea").value = area;</p>
<p class="p2"><span class="Apple-converted-space">      </span>state.selectedArea = area;</p>
<p class="p2"><span class="Apple-converted-space">      </span>if (state.selectedDate) loadAvailability(state.selectedDate, area);</p>
<p class="p2"><span class="Apple-converted-space">    </span>});</p>
<p class="p2"><span class="Apple-converted-space">  </span>});</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">  </span>// Options checkboxes</p>
<p class="p2"><span class="Apple-converted-space">  </span>$("#optRental").addEventListener("change", (e) =&gt; { state.options.Rental = e.target.checked; });</p>
<p class="p2"><span class="Apple-converted-space">  </span>$("#optFastTrack").addEventListener("change", (e) =&gt; { state.options.FastTrack = e.target.checked; });</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">  </span>// Modal</p>
<p class="p2"><span class="Apple-converted-space">  </span>$("#modalBackdrop").addEventListener("click", closeModal);</p>
<p class="p2"><span class="Apple-converted-space">  </span>$("#closeModal").addEventListener("click", closeModal);</p>
<p class="p2"><span class="Apple-converted-space">  </span>$("#bookingForm").addEventListener("submit", submitBooking);</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">  </span>// Reduce motion</p>
<p class="p2"><span class="Apple-converted-space">  </span>if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {</p>
<p class="p2"><span class="Apple-converted-space">    </span>const v = $(".hero__video");</p>
<p class="p2"><span class="Apple-converted-space">    </span>if (v) v.pause();</p>
<p class="p2"><span class="Apple-converted-space">  </span>}</p>
<p class="p2">}</p>
<p class="p1"><br></p>
<p class="p2">// ------------------------------</p>
<p class="p2">// Calendar</p>
<p class="p2">// ------------------------------</p>
<p class="p2">function renderCalendar(){</p>
<p class="p2"><span class="Apple-converted-space">  </span>const cursor = new Date(state.calendarCursor.getFullYear(), state.calendarCursor.getMonth(), 1);</p>
<p class="p2"><span class="Apple-converted-space">  </span>$("#calendarMonth").textContent = cursor.toLocaleString("en-US", { month:"long", year:"numeric" });</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">  </span>const grid = $("#calendarGrid");</p>
<p class="p2"><span class="Apple-converted-space">  </span>grid.innerHTML = "";</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">  </span>// Mon-first</p>
<p class="p2"><span class="Apple-converted-space">  </span>const firstDay = cursor.getDay(); // 0 Sun</p>
<p class="p2"><span class="Apple-converted-space">  </span>const offset = (firstDay + 6) % 7; // 0 Mon ... 6 Sun</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">  </span>const start = new Date(cursor);</p>
<p class="p2"><span class="Apple-converted-space">  </span>start.setDate(start.getDate() - offset);</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">  </span>for (let i=0; i&lt;42; i++){</p>
<p class="p2"><span class="Apple-converted-space">    </span>const d = new Date(start);</p>
<p class="p2"><span class="Apple-converted-space">    </span>d.setDate(start.getDate() + i);</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">    </span>const inMonth = d.getMonth() === cursor.getMonth();</p>
<p class="p2"><span class="Apple-converted-space">    </span>const dayIso = isoDate(d);</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">    </span>const el = document.createElement("div");</p>
<p class="p2"><span class="Apple-converted-space">    </span>el.className = "day" + (inMonth ? "" : " day--muted");</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">    </span>const price = mockMinPrice(dayIso);</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">    </span>el.innerHTML = `</p>
<p class="p2"><span class="Apple-converted-space">      </span>&lt;div class="day__num"&gt;${d.getDate()}&lt;/div&gt;</p>
<p class="p2"><span class="Apple-converted-space">      </span>&lt;div class="day__price"&gt;¥${formatNum(price)}〜&lt;/div&gt;</p>
<p class="p2"><span class="Apple-converted-space">    </span>`;</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">    </span>if (!inMonth) {</p>
<p class="p2"><span class="Apple-converted-space">      </span>grid.appendChild(el);</p>
<p class="p2"><span class="Apple-converted-space">      </span>continue;</p>
<p class="p2"><span class="Apple-converted-space">    </span>}</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">    </span>el.addEventListener("click", () =&gt; selectDate(dayIso, el));</p>
<p class="p2"><span class="Apple-converted-space">    </span>if (state.selectedDate === dayIso) el.classList.add("day--selected");</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">    </span>grid.appendChild(el);</p>
<p class="p2"><span class="Apple-converted-space">  </span>}</p>
<p class="p2">}</p>
<p class="p1"><br></p>
<p class="p2">function selectDate(dateIso){</p>
<p class="p2"><span class="Apple-converted-space">  </span>state.selectedDate = dateIso;</p>
<p class="p2"><span class="Apple-converted-space">  </span>$("#slotsSub").textContent = `${dateIso} / ${labelArea(state.selectedArea)}`;</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">  </span>// update selected class</p>
<p class="p2"><span class="Apple-converted-space">  </span>$$("#calendarGrid .day").forEach(d =&gt; d.classList.remove("day--selected"));</p>
<p class="p2"><span class="Apple-converted-space">  </span>// re-render to keep selection state stable</p>
<p class="p2"><span class="Apple-converted-space">  </span>renderCalendar();</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">  </span>loadAvailability(dateIso, state.selectedArea);</p>
<p class="p2">}</p>
<p class="p1"><br></p>
<p class="p2">// ------------------------------</p>
<p class="p2">// Availability API</p>
<p class="p2">// ------------------------------</p>
<p class="p2">async function loadAvailability(dateIso, area){</p>
<p class="p2"><span class="Apple-converted-space">  </span>const list = $("#slotsList");</p>
<p class="p2"><span class="Apple-converted-space">  </span>list.classList.remove("empty");</p>
<p class="p2"><span class="Apple-converted-space">  </span>list.innerHTML = `&lt;div class="empty"&gt;&lt;div class="empty__title"&gt;読み込み中…&lt;/div&gt;&lt;div class="empty__text"&gt;空き枠を取得しています&lt;/div&gt;&lt;/div&gt;`;</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">  </span>try{</p>
<p class="p2"><span class="Apple-converted-space">    </span>if (!GAS_ENDPOINT || GAS_ENDPOINT.includes("PASTE_YOUR")) {</p>
<p class="p2"><span class="Apple-converted-space">      </span>list.innerHTML = `&lt;div class="empty"&gt;</p>
<p class="p2"><span class="Apple-converted-space">        </span>&lt;div class="empty__title"&gt;GAS URL 未設定&lt;/div&gt;</p>
<p class="p2"><span class="Apple-converted-space">        </span>&lt;div class="empty__text"&gt;app.js の GAS_ENDPOINT をウェブアプリURLに差し替えてください。&lt;/div&gt;</p>
<p class="p2"><span class="Apple-converted-space">      </span>&lt;/div&gt;`;</p>
<p class="p2"><span class="Apple-converted-space">      </span>return;</p>
<p class="p2"><span class="Apple-converted-space">    </span>}</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">    </span>const url = `${GAS_ENDPOINT}?action=availability&amp;date=${encodeURIComponent(dateIso)}&amp;area=${encodeURIComponent(area)}`;</p>
<p class="p2"><span class="Apple-converted-space">    </span>const res = await fetch(url, { method:"GET" });</p>
<p class="p2"><span class="Apple-converted-space">    </span>const data = await res.json();</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">    </span>if (!data.ok) throw new Error("API error");</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">    </span>renderSlots(data.slots || [], dateIso, area);</p>
<p class="p2"><span class="Apple-converted-space">  </span>}catch(err){</p>
<p class="p2"><span class="Apple-converted-space">    </span>list.innerHTML = `&lt;div class="empty"&gt;</p>
<p class="p2"><span class="Apple-converted-space">      </span>&lt;div class="empty__title"&gt;取得に失敗&lt;/div&gt;</p>
<p class="p2"><span class="Apple-converted-space">      </span>&lt;div class="empty__text"&gt;GAS公開設定（全員）とURLを確認してください。&lt;/div&gt;</p>
<p class="p2"><span class="Apple-converted-space">    </span>&lt;/div&gt;`;</p>
<p class="p2"><span class="Apple-converted-space">  </span>}</p>
<p class="p2">}</p>
<p class="p1"><br></p>
<p class="p2">function renderSlots(slots, dateIso, area){</p>
<p class="p2"><span class="Apple-converted-space">  </span>const list = $("#slotsList");</p>
<p class="p2"><span class="Apple-converted-space">  </span>list.innerHTML = "";</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">  </span>if (!slots.length){</p>
<p class="p2"><span class="Apple-converted-space">    </span>list.classList.add("empty");</p>
<p class="p2"><span class="Apple-converted-space">    </span>list.innerHTML = `&lt;div class="empty"&gt;</p>
<p class="p2"><span class="Apple-converted-space">      </span>&lt;div class="empty__title"&gt;空き枠なし&lt;/div&gt;</p>
<p class="p2"><span class="Apple-converted-space">      </span>&lt;div class="empty__text"&gt;別の日付または別エリアでお試しください。&lt;/div&gt;</p>
<p class="p2"><span class="Apple-converted-space">    </span>&lt;/div&gt;`;</p>
<p class="p2"><span class="Apple-converted-space">    </span>return;</p>
<p class="p2"><span class="Apple-converted-space">  </span>}</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">  </span>slots</p>
<p class="p2"><span class="Apple-converted-space">    </span>.sort((a,b) =&gt; (a.time &gt; b.time ? 1 : -1))</p>
<p class="p2"><span class="Apple-converted-space">    </span>.slice(0, 18)</p>
<p class="p2"><span class="Apple-converted-space">    </span>.forEach(s =&gt; {</p>
<p class="p2"><span class="Apple-converted-space">      </span>const el = document.createElement("div");</p>
<p class="p2"><span class="Apple-converted-space">      </span>el.className = "slot";</p>
<p class="p2"><span class="Apple-converted-space">      </span>el.innerHTML = `</p>
<p class="p2"><span class="Apple-converted-space">        </span>&lt;div class="slot__left"&gt;</p>
<p class="p2"><span class="Apple-converted-space">          </span>&lt;div class="slot__time"&gt;${s.time}&lt;/div&gt;</p>
<p class="p2"><span class="Apple-converted-space">          </span>&lt;div class="slot__course"&gt;${escapeHtml(s.course)}&lt;/div&gt;</p>
<p class="p2"><span class="Apple-converted-space">        </span>&lt;/div&gt;</p>
<p class="p2"><span class="Apple-converted-space">        </span>&lt;div class="slot__right"&gt;</p>
<p class="p2"><span class="Apple-converted-space">          </span>${s.badge ? `&lt;span class="badge"&gt;${escapeHtml(s.badge)}&lt;/span&gt;` : ""}</p>
<p class="p2"><span class="Apple-converted-space">          </span>&lt;div class="price"&gt;¥${formatNum(s.price)}&lt;/div&gt;</p>
<p class="p2"><span class="Apple-converted-space">          </span>&lt;button class="btn btn--primary" type="button"&gt;予約&lt;/button&gt;</p>
<p class="p2"><span class="Apple-converted-space">        </span>&lt;/div&gt;</p>
<p class="p2"><span class="Apple-converted-space">      </span>`;</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">      </span>el.querySelector("button").addEventListener("click", () =&gt; {</p>
<p class="p2"><span class="Apple-converted-space">        </span>openModal({</p>
<p class="p2"><span class="Apple-converted-space">          </span>date: dateIso,</p>
<p class="p2"><span class="Apple-converted-space">          </span>time: s.time,</p>
<p class="p2"><span class="Apple-converted-space">          </span>course: s.course,</p>
<p class="p2"><span class="Apple-converted-space">          </span>area: area,</p>
<p class="p2"><span class="Apple-converted-space">          </span>price: s.price</p>
<p class="p2"><span class="Apple-converted-space">        </span>});</p>
<p class="p2"><span class="Apple-converted-space">      </span>});</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">      </span>list.appendChild(el);</p>
<p class="p2"><span class="Apple-converted-space">    </span>});</p>
<p class="p2">}</p>
<p class="p1"><br></p>
<p class="p2">// ------------------------------</p>
<p class="p2">// Purpose/Area results (demo)</p>
<p class="p2">// ------------------------------</p>
<p class="p2">function renderPurposeResults(purpose){</p>
<p class="p2"><span class="Apple-converted-space">  </span>const list = $("#purposeList");</p>
<p class="p2"><span class="Apple-converted-space">  </span>list.innerHTML = "";</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">  </span>const items = COURSE_LIBRARY.filter(c =&gt; c.purposes.includes(purpose)).slice(0, 6);</p>
<p class="p2"><span class="Apple-converted-space">  </span>items.forEach(c =&gt; list.appendChild(resultItemEl(c, { showArea:true })));</p>
<p class="p2">}</p>
<p class="p2">function renderAreaResults(area){</p>
<p class="p2"><span class="Apple-converted-space">  </span>const list = $("#areaList");</p>
<p class="p2"><span class="Apple-converted-space">  </span>list.innerHTML = "";</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">  </span>const items = COURSE_LIBRARY.filter(c =&gt; c.area === area).slice(0, 6);</p>
<p class="p2"><span class="Apple-converted-space">  </span>items.forEach(c =&gt; list.appendChild(resultItemEl(c, { showArea:false })));</p>
<p class="p2">}</p>
<p class="p1"><br></p>
<p class="p2">function resultItemEl(course, { showArea }){</p>
<p class="p2"><span class="Apple-converted-space">  </span>const el = document.createElement("div");</p>
<p class="p2"><span class="Apple-converted-space">  </span>el.className = "resultItem";</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">  </span>el.innerHTML = `</p>
<p class="p2"><span class="Apple-converted-space">    </span>&lt;div class="resultItem__left"&gt;</p>
<p class="p2"><span class="Apple-converted-space">      </span>&lt;div class="resultItem__title"&gt;${escapeHtml(course.name)}&lt;/div&gt;</p>
<p class="p2"><span class="Apple-converted-space">      </span>&lt;div class="resultItem__meta"&gt;${showArea ? labelArea(course.area) : "人気コース"} / ¥${formatNum(mockCoursePrice(course.name))}〜&lt;/div&gt;</p>
<p class="p2"><span class="Apple-converted-space">      </span>&lt;div class="resultItem__tags"&gt;</p>
<p class="p2"><span class="Apple-converted-space">        </span>${course.tags.map(t =&gt; `&lt;span class="tag"&gt;${escapeHtml(t)}&lt;/span&gt;`).join("")}</p>
<p class="p2"><span class="Apple-converted-space">      </span>&lt;/div&gt;</p>
<p class="p2"><span class="Apple-converted-space">    </span>&lt;/div&gt;</p>
<p class="p2"><span class="Apple-converted-space">    </span>&lt;div&gt;</p>
<p class="p2"><span class="Apple-converted-space">      </span>&lt;a class="btn btn--ghost" href="#calendar"&gt;空き枠を見る&lt;/a&gt;</p>
<p class="p2"><span class="Apple-converted-space">    </span>&lt;/div&gt;</p>
<p class="p2"><span class="Apple-converted-space">  </span>`;</p>
<p class="p2"><span class="Apple-converted-space">  </span>return el;</p>
<p class="p2">}</p>
<p class="p1"><br></p>
<p class="p2">// ------------------------------</p>
<p class="p2">// Modal booking</p>
<p class="p2">// ------------------------------</p>
<p class="p2">function openModal({date, time, course, area, price}){</p>
<p class="p2"><span class="Apple-converted-space">  </span>const modal = $("#modal");</p>
<p class="p2"><span class="Apple-converted-space">  </span>modal.classList.add("is-open");</p>
<p class="p2"><span class="Apple-converted-space">  </span>modal.setAttribute("aria-hidden", "false");</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">  </span>$("#modalSub").textContent = `${date} / ${time} / ${course} / ¥${formatNum(price)}`;</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">  </span>const form = $("#bookingForm");</p>
<p class="p2"><span class="Apple-converted-space">  </span>form.date.value = date;</p>
<p class="p2"><span class="Apple-converted-space">  </span>form.time.value = time;</p>
<p class="p2"><span class="Apple-converted-space">  </span>form.course.value = course;</p>
<p class="p2"><span class="Apple-converted-space">  </span>form.area.value = area;</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">  </span>// reflect global options</p>
<p class="p2"><span class="Apple-converted-space">  </span>// set checkboxes</p>
<p class="p2"><span class="Apple-converted-space">  </span>$$("#bookingForm input[name='options']").forEach(ch =&gt; {</p>
<p class="p2"><span class="Apple-converted-space">    </span>if (ch.value === "Rental") ch.checked = !!state.options.Rental;</p>
<p class="p2"><span class="Apple-converted-space">    </span>if (ch.value === "FastTrack") ch.checked = !!state.options.FastTrack;</p>
<p class="p2"><span class="Apple-converted-space">  </span>});</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">  </span>// default purpose (if user selected)</p>
<p class="p2"><span class="Apple-converted-space">  </span>if (state.purpose) form.purpose.value = state.purpose;</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">  </span>document.body.style.overflow = "hidden";</p>
<p class="p2">}</p>
<p class="p1"><br></p>
<p class="p2">function closeModal(){</p>
<p class="p2"><span class="Apple-converted-space">  </span>const modal = $("#modal");</p>
<p class="p2"><span class="Apple-converted-space">  </span>modal.classList.remove("is-open");</p>
<p class="p2"><span class="Apple-converted-space">  </span>modal.setAttribute("aria-hidden", "true");</p>
<p class="p2"><span class="Apple-converted-space">  </span>document.body.style.overflow = "";</p>
<p class="p2">}</p>
<p class="p1"><br></p>
<p class="p2">async function submitBooking(e){</p>
<p class="p2"><span class="Apple-converted-space">  </span>e.preventDefault();</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">  </span>const form = e.currentTarget;</p>
<p class="p2"><span class="Apple-converted-space">  </span>const submitBtn = $("#submitBooking");</p>
<p class="p2"><span class="Apple-converted-space">  </span>submitBtn.disabled = true;</p>
<p class="p2"><span class="Apple-converted-space">  </span>submitBtn.textContent = "送信中…";</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">  </span>try{</p>
<p class="p2"><span class="Apple-converted-space">    </span>if (!GAS_ENDPOINT || GAS_ENDPOINT.includes("PASTE_YOUR")) {</p>
<p class="p2"><span class="Apple-converted-space">      </span>throw new Error("GAS endpoint missing");</p>
<p class="p2"><span class="Apple-converted-space">    </span>}</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">    </span>const fd = new FormData(form);</p>
<p class="p2"><span class="Apple-converted-space">    </span>const options = [];</p>
<p class="p2"><span class="Apple-converted-space">    </span>$$("#bookingForm input[name='options']:checked").forEach(ch =&gt; options.push(ch.value));</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">    </span>const payload = {</p>
<p class="p2"><span class="Apple-converted-space">      </span>date: fd.get("date"),</p>
<p class="p2"><span class="Apple-converted-space">      </span>time: fd.get("time"),</p>
<p class="p2"><span class="Apple-converted-space">      </span>area: fd.get("area"),</p>
<p class="p2"><span class="Apple-converted-space">      </span>purpose: fd.get("purpose"),</p>
<p class="p2"><span class="Apple-converted-space">      </span>course: fd.get("course"),</p>
<p class="p2"><span class="Apple-converted-space">      </span>players: Number(fd.get("players") || 1),</p>
<p class="p2"><span class="Apple-converted-space">      </span>options,</p>
<p class="p2"><span class="Apple-converted-space">      </span>name: fd.get("name")</p>
<p class="p2"><span class="Apple-converted-space">    </span>};</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">    </span>const res = await fetch(GAS_ENDPOINT, {</p>
<p class="p2"><span class="Apple-converted-space">      </span>method: "POST",</p>
<p class="p2"><span class="Apple-converted-space">      </span>headers: {"Content-Type":"application/json"},</p>
<p class="p2"><span class="Apple-converted-space">      </span>body: JSON.stringify(payload)</p>
<p class="p2"><span class="Apple-converted-space">    </span>});</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">    </span>const data = await res.json();</p>
<p class="p2"><span class="Apple-converted-space">    </span>if (!data.ok) throw new Error(data.error || "API error");</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">    </span>$("#bookingHint").textContent = "予約を保存しました（Bookingsシートを確認）";</p>
<p class="p2"><span class="Apple-converted-space">    </span>submitBtn.textContent = "予約完了";</p>
<p class="p2"><span class="Apple-converted-space">    </span>setTimeout(() =&gt; {</p>
<p class="p2"><span class="Apple-converted-space">      </span>closeModal();</p>
<p class="p2"><span class="Apple-converted-space">      </span>submitBtn.disabled = false;</p>
<p class="p2"><span class="Apple-converted-space">      </span>submitBtn.textContent = "予約を確定";</p>
<p class="p2"><span class="Apple-converted-space">      </span>$("#bookingHint").textContent = "※ デモ：Googleスプレッドシートへ保存します";</p>
<p class="p2"><span class="Apple-converted-space">      </span>form.reset();</p>
<p class="p2"><span class="Apple-converted-space">    </span>}, 900);</p>
<p class="p1"><br></p>
<p class="p2"><span class="Apple-converted-space">  </span>}catch(err){</p>
<p class="p2"><span class="Apple-converted-space">    </span>$("#bookingHint").textContent = "送信に失敗しました。GASの公開設定とURLを確認してください。";</p>
<p class="p2"><span class="Apple-converted-space">    </span>submitBtn.disabled = false;</p>
<p class="p2"><span class="Apple-converted-space">    </span>submitBtn.textContent = "予約を確定";</p>
<p class="p2"><span class="Apple-converted-space">  </span>}</p>
<p class="p2">}</p>
<p class="p1"><br></p>
<p class="p2">// ------------------------------</p>
<p class="p2">// Helpers</p>
<p class="p2">// ------------------------------</p>
<p class="p2">function isoDate(d){</p>
<p class="p2"><span class="Apple-converted-space">  </span>const y = d.getFullYear();</p>
<p class="p2"><span class="Apple-converted-space">  </span>const m = String(d.getMonth()+1).padStart(2,"0");</p>
<p class="p2"><span class="Apple-converted-space">  </span>const day = String(d.getDate()).padStart(2,"0");</p>
<p class="p2"><span class="Apple-converted-space">  </span>return `${y}-${m}-${day}`;</p>
<p class="p2">}</p>
<p class="p2">function formatNum(n){</p>
<p class="p2"><span class="Apple-converted-space">  </span>return Number(n).toLocaleString("ja-JP");</p>
<p class="p2">}</p>
<p class="p2">function scrollToId(id){</p>
<p class="p2"><span class="Apple-converted-space">  </span>const el = document.getElementById(id);</p>
<p class="p2"><span class="Apple-converted-space">  </span>if (!el) return;</p>
<p class="p2"><span class="Apple-converted-space">  </span>el.scrollIntoView({ behavior:"smooth", block:"start" });</p>
<p class="p2">}</p>
<p class="p2">function labelArea(a){</p>
<p class="p2"><span class="Apple-converted-space">  </span>return ({</p>
<p class="p2"><span class="Apple-converted-space">    </span>Bangkok:"バンコク",</p>
<p class="p2"><span class="Apple-converted-space">    </span>Pattaya:"パタヤ",</p>
<p class="p2"><span class="Apple-converted-space">    </span>HuaHin:"ホアヒン",</p>
<p class="p2"><span class="Apple-converted-space">    </span>ChiangMai:"チェンマイ"</p>
<p class="p2"><span class="Apple-converted-space">  </span>})[a] || a;</p>
<p class="p2">}</p>
<p class="p2">function labelPurpose(p){</p>
<p class="p2"><span class="Apple-converted-space">  </span>return ({</p>
<p class="p2"><span class="Apple-converted-space">    </span>Serious:"ガチ勢",</p>
<p class="p2"><span class="Apple-converted-space">    </span>Caddie:"キャディさんと",</p>
<p class="p2"><span class="Apple-converted-space">    </span>Beginner:"初心者コース",</p>
<p class="p2"><span class="Apple-converted-space">    </span>Luxury:"高級クラブ"</p>
<p class="p2"><span class="Apple-converted-space">  </span>})[p] || p;</p>
<p class="p2">}</p>
<p class="p2">function escapeHtml(str){</p>
<p class="p2"><span class="Apple-converted-space">  </span>return String(str)</p>
<p class="p2"><span class="Apple-converted-space">    </span>.replaceAll("&amp;","&amp;amp;")</p>
<p class="p2"><span class="Apple-converted-space">    </span>.replaceAll("&lt;","&amp;lt;")</p>
<p class="p2"><span class="Apple-converted-space">    </span>.replaceAll("&gt;","&amp;gt;")</p>
<p class="p2"><span class="Apple-converted-space">    </span>.replaceAll('"',"&amp;quot;");</p>
<p class="p2">}</p>
<p class="p1"><br></p>
<p class="p2">// 데모価格（カレンダー用）</p>
<p class="p2">function mockMinPrice(dateIso){</p>
<p class="p2"><span class="Apple-converted-space">  </span>const seed = hash(dateIso);</p>
<p class="p2"><span class="Apple-converted-space">  </span>return 14000 + (seed % 18) * 600;</p>
<p class="p2">}</p>
<p class="p2">function mockCoursePrice(name){</p>
<p class="p2"><span class="Apple-converted-space">  </span>const seed = hash(name);</p>
<p class="p2"><span class="Apple-converted-space">  </span>return 16000 + (seed % 22) * 700;</p>
<p class="p2">}</p>
<p class="p2">function hash(s){</p>
<p class="p2"><span class="Apple-converted-space">  </span>let h = 0;</p>
<p class="p2"><span class="Apple-converted-space">  </span>for (let i=0;i&lt;s.length;i++) h = (h*31 + s.charCodeAt(i)) &gt;&gt;&gt; 0;</p>
<p class="p2"><span class="Apple-converted-space">  </span>return h;</p>
<p class="p2">}</p>
</body>
</html>
