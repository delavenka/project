const API_URL = "api/todos";

// 1. Sayfa açıldığında mevcut todoları getir
window.onload = fetchTodos;

async function fetchTodos() {
    try {
        const res = await fetch(API_URL);
        const todos = await res.json();
        
        const list = document.getElementById('todoList');
        list.innerHTML = ''; // Önce listeyi temizle ki üst üste binmesin

        todos.forEach(todo => {
            // Liste elemanını oluştur
            const li = document.createElement('li');
            li.style.display = "flex";
            li.style.justifyContent = "space-between";
            li.style.marginBottom = "10px";
            li.style.padding = "5px";
            li.style.borderBottom = "1px solid #ddd";

            li.innerHTML = `
                <span>${todo.text}</span>
                <button onclick="deleteTodo(${todo.id})" style="background-color: red; color: white; border: none; cursor: pointer;">Sil</button>
            `;
            list.appendChild(li);
        });
    } catch (err) {
        console.error("Liste yüklenirken hata oluştu:", err);
    }
}

async function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value;
    
    if (!text) return;

    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: text })
        });
        
        input.value = ''; // Kutuyu temizle
        fetchTodos(); // Listeyi yenile
    } catch (err) {
        alert("Ekleme yapılamadı!");
    }
}

async function deleteTodo(id) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        fetchTodos(); // Silindikten sonra listeyi yenile
    } catch (err) {
        alert("Silme işlemi başarısız!");
    }
}
