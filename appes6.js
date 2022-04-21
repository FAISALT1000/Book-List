class Book {
    constructor(title, author, isbn) {
      this.title = title;
      this.author = author;
      this.isbn = isbn;
    }
  }
  
  class UI {
    addBookToList(book) {
      const list = document.getElementById('book-list');
      // Create tr element
      const row = document.createElement('tr');
      // Insert cols
      row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X<a></td>
      `;
    
      list.appendChild(row);
    }
  
    showAlert(message, className) {
      const div = document.createElement('div');
      div.className = `alert ${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#book-form');
      container.insertBefore(div, form);
        setTimeout(function(){
        document.querySelector('.alert').remove();
      }, 3000);
    }
  
    deleteBook(target) {
      if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
      }
    }
  
    clearFields() {
      document.getElementById('title').value = '';
      document.getElementById('author').value = '';
      document.getElementById('isbn').value = '';
    }
  }
  
  document.getElementById('book-form').addEventListener('submit', function(e){
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value
  
    const book = new Book(title, author, isbn);
  
    const ui = new UI();
  
    console.log(ui);
  
    if(title === '' || author === '' || isbn === '') {
      ui.showAlert('Please fill in all the fields', 'error');
    } else {
      ui.addBookToList(book);
      ui.showAlert('Book Added successfully', 'success');
      ui.clearFields();
    }
  
    e.preventDefault();
  });
  
  document.getElementById('book-list').addEventListener('click', function(e){
  
    const ui = new UI();
  
    ui.deleteBook(e.target);
    ui.showAlert('The book are Delete it successfully','success');
    e.preventDefault();
  });