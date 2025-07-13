const data = {
  1: [
    {id:'C1', name:'INGLÉS I', credits:1, type:'A', prereq:[]},
    {id:'C2', name:'TALLER DE EXPRESIÓN ORAL Y ESCRITA', credits:2, type:'A', prereq:[]},
    // ... resto del semestre 1
  ],
  2: [
    {id:'C10', name:'INGLÉS II', credits:1, type:'A', prereq:['C1']},
    // ...
  ],
  // y así sucesivamente hasta el semestre 10:
  10: [
    {id:'C49', name:'INTERNADO II', credits:21, type:'C', prereq:['C48']}
  ]
};

function createMalla() {
  const container = document.getElementById('malla');
  for (let sem = 1; sem <= 10; sem++) {
    const col = document.createElement('div');
    col.className = 'semestre';
    col.innerHTML = `<h2>Semestre ${sem}</h2>`;
    data[sem].forEach(c => {
      const div = document.createElement('div');
      div.className = 'course';
      div.id = c.id;
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.disabled = c.prereq.length > 0;
      cb.addEventListener('change',() => toggleCourse(c.id));
      const lbl = document.createElement('label');
      lbl.innerText = `${c.id} - ${c.name} (${c.credits} cr) [${c.type}]`;
      div.append(cb, lbl);
      col.append(div);
    });
    container.append(col);
  }
}

function toggleCourse(id) {
  const checked = document.getElementById(id).querySelector('input').checked;
  // Recorre todos los cursos para actualizar su estado
  for (let sem = 1; sem <= 10; sem++) {
    data[sem].forEach(c => {
      const el = document.getElementById(c.id).querySelector('input');
      if (!el.checked) {
        const ok = c.prereq.every(r => document.getElementById(r).querySelector('input').checked);
        el.disabled = !ok;
        const div = document.getElementById(c.id);
        div.classList.toggle('disabled', !ok);
      }
    });
  }
}

window.onload = () => {
  createMalla();
  // activamos los sin prerequisitos
  toggleCourse();
};
