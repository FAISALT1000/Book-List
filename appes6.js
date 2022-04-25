//  new thing
document.getElementById('button').addEventListener('click',loadBooks);


function loadBooks(e){
  const xhr = new XMLHttpRequest();
  xhr.open('GET','books.json',true);
  xhr.onload = function(){
    if(this.status === 200){
       console.log(this.responseText);

      const books = JSON.parse(this.responseText);

      let output='';
      books.forEach(function(book){
        output +=
        `<ul>
        <li>ISBN: ${book.isbn}</li>
        <li>Title: ${book.title}</li>
        <li>Author: ${book.author}</li>
        </ul>
        <br>`;
      });

      /*const customers = JSON.parse(this.responseText);

           let output = '';
           customers.forEach(function(customer){
             output += `
            <ul>
            <li>ID: ${customer.id}</li>
            <li>Name: ${customer.name}</li>
            <li>Company: ${customer.company}</li>
            <li>Phone: ${customer.phone}</li>
            </ul>
            <br>
            `;
           });
     */
     

      document.getElementById('output4').innerHTML = output;
    }};
  xhr.send();
};



// new thing
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
}};
  class Store {
     static getBooks(){
         let books;
         if(localStorage.getItem('books')=== null){
             books = [];
         }else{
           books =JSON.parse(localStorage.getItem('books'));
         }
         return books;
     } 
     static displayBooks (){
        const books = Store.getBooks();
        books.forEach(function(book){
            const ui = new UI();
            ui.addBookToList(book);
        });
    
     }
     static addBooks(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
     }
     static removeBooks(isbn){

        const books = Store.getBooks();
        books.forEach(function(book, index){
          if(book.isbn=== isbn){
              books.splice(index, 1);
          }
        });
        localStorage.setItem('books',JSON.stringify(books));

     };
    };
   
    document.addEventListener('DOMContentLoaded', Store.displayBooks);


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
      Store.addBooks(book);
      ui.showAlert('Book Added successfully', 'success');
      ui.clearFields();
    }
  
    e.preventDefault();
  });
  
  document.getElementById('book-list').addEventListener('click', function(e){
  
    const ui = new UI();
  
    ui.deleteBook(e.target);

    Store.removeBooks(e.target.parentElement.
        previousElementSibling.textContent);

    ui.showAlert('The book are Delete it successfully','success');
    e.preventDefault();
  });