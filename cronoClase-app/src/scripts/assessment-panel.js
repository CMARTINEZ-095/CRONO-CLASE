// assessment-panel.js
// CRUD simple para estudiantes en el Panel de Evaluación
// - Almacenamiento local en localStorage (key: crono_estudiantes_v1)
// - Opcional: sincronización POST/GET con MOCK_ENDPOINT si está configurado

(function(){
	const STORAGE_KEY = 'crono_estudiantes_v1';
	// Cambia este endpoint si quieres que se sincronice con Mockoon
	const MOCK_ENDPOINT = ''; // e.g. 'http://localhost:3000/students'

	function uid(){ return Date.now().toString(36) + Math.random().toString(36).slice(2,8); }

	function readStorage(){
		try{ return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }catch(e){ return []; }
	}
	function writeStorage(arr){ localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); }

	// Render container: inyecta el form y la tabla si no existen
	function ensureDom(){
		const container = document.querySelector('body');
		if(!document.getElementById('assessmentPanel')){
			const wrap = document.createElement('section');
			wrap.id = 'assessmentPanel';
			wrap.innerHTML = `
				<div class="assessment-panel">
					<h2>Estudiantes</h2>
					<div class="flex-row" style="display:flex;gap:1rem;align-items:flex-start;">
						<form id="studentForm" style="min-width:280px;max-width:420px;flex:0 0 360px;">
							<input type="hidden" id="studentId" />
							<label>Nombre<br/><input id="studentName" required style="width:100%"/></label>
							<label>Correo<br/><input id="studentEmail" type="email" style="width:100%"/></label>
							<div style="margin-top:.5rem;display:flex;gap:.5rem;">
								<button id="saveStudent" type="submit">Guardar</button>
								<button id="cancelEdit" type="button">Cancelar</button>
								<span id="studentMsg" style="margin-left:8px;color:#333"></span>
							</div>
						</form>
						<div style="flex:1 1 0;">
							<input id="studentSearch" placeholder="Buscar por nombre o correo" style="width:100%;margin-bottom:.6rem;"/>
							<table id="studentsTable" border="0" cellspacing="0" cellpadding="6" style="width:100%;border-collapse:collapse;">
								<thead><tr><th>Nombre</th><th>Correo</th><th style="width:120px">Acciones</th></tr></thead>
								<tbody></tbody>
							</table>
						</div>
					</div>
				</div>
			`;
			// insert near top of body (after nav if present)
			const nav = document.querySelector('nav');
			if(nav && nav.parentNode) nav.parentNode.insertBefore(wrap, nav.nextSibling);
			else container.insertBefore(wrap, container.firstChild);
		}
	}

	function render(filter) {
		const rows = readStorage();
		const tbody = document.querySelector('#studentsTable tbody');
		if(!tbody) return;
		const q = (filter||'').toLowerCase();
		tbody.innerHTML = '';
		rows.filter(r=>{
			if(!q) return true;
			return (r.name||'').toLowerCase().includes(q) || (r.email||'').toLowerCase().includes(q);
		}).forEach(s=>{
			const tr = document.createElement('tr');
			tr.innerHTML = `<td>${escapeHtml(s.name)}</td><td>${escapeHtml(s.email||'')}</td><td>
				<button class="edit" data-id="${s.id}">Editar</button>
				<button class="del" data-id="${s.id}">Borrar</button>
			</td>`;
			tbody.appendChild(tr);
		});
	}

	function escapeHtml(str){ return String(str||'').replace(/[&<>"']/g, (s)=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;" })[s]); }

	function bind(){
		const form = document.getElementById('studentForm');
		const save = document.getElementById('saveStudent');
		const cancel = document.getElementById('cancelEdit');
		const msg = document.getElementById('studentMsg');
		const search = document.getElementById('studentSearch');

		form.addEventListener('submit', async (e)=>{
			e.preventDefault();
			const id = document.getElementById('studentId').value;
			const name = document.getElementById('studentName').value.trim();
			const email = document.getElementById('studentEmail').value.trim();
			if(!name){ msg.textContent = 'El nombre es requerido'; return; }
			let arr = readStorage();
			if(id){
				arr = arr.map(r=> r.id===id ? Object.assign({}, r, { name, email }) : r);
				writeStorage(arr);
				msg.textContent = 'Actualizado';
				if(MOCK_ENDPOINT) try{ await apiUpdate(id,{name,email}); }catch(e){ console.warn(e); }
			} else {
				const newItem = { id: uid(), name, email };
				arr.push(newItem); writeStorage(arr);
				msg.textContent = 'Creado';
				if(MOCK_ENDPOINT) try{ const created = await apiCreate(newItem); /* optionally sync id */ }catch(e){ console.warn(e); }
			}
			form.reset(); document.getElementById('studentId').value='';
			setTimeout(()=>msg.textContent='',1500);
			render(search.value);
		});

		cancel.addEventListener('click', ()=>{ form.reset(); document.getElementById('studentId').value=''; msg.textContent=''; });

		document.querySelector('#studentsTable tbody').addEventListener('click', async (e)=>{
			const btn = e.target.closest('button'); if(!btn) return;
			const id = btn.dataset.id;
			if(btn.classList.contains('edit')){
				const arr = readStorage(); const s = arr.find(x=>x.id===id); if(!s) return; document.getElementById('studentId').value=s.id; document.getElementById('studentName').value=s.name; document.getElementById('studentEmail').value=s.email||'';
			} else if(btn.classList.contains('del')){
				if(!confirm('Borrar estudiante?')) return;
				let arr = readStorage(); arr = arr.filter(x=>x.id!==id); writeStorage(arr);
				if(MOCK_ENDPOINT) try{ await apiDelete(id); }catch(e){ console.warn(e); }
				render(search.value);
			}
		});

		search.addEventListener('input',(e)=>render(e.target.value));
	}

	// Optional API helpers (basic): adapt paths to your mock server
	async function apiCreate(item){
		const res = await fetch(MOCK_ENDPOINT, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(item) });
		if(!res.ok) throw new Error('api create failed');
		return await res.json();
	}
	async function apiUpdate(id,payload){
		const res = await fetch(`${MOCK_ENDPOINT}/${id}`, { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
		if(!res.ok) throw new Error('api update failed');
		return await res.json();
	}
	async function apiDelete(id){
		const res = await fetch(`${MOCK_ENDPOINT}/${id}`, { method:'DELETE' });
		if(!res.ok) throw new Error('api delete failed');
		return true;
	}

	// Initialize
	document.addEventListener('DOMContentLoaded', ()=>{
		ensureDom();
		render();
		bind();
	});

})();
