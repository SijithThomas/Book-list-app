//book class
class Book{
    constructor(title, author, isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}
//Ui class
class ui{
    static displayBooks(){
        const books= store.getBooks();
        books.forEach((book)=>ui.addBookToList(book));
    }
    static addBookToList(book){
        const list=document.querySelector('#book-list');
        const row=document.createElement('tr');
        row.innerHTML=`<td>${book.title}</td>
                       <td>${book.author}</td>
                       <td>${book.isbn}</td>
                       <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;
        list.appendChild(row);

    }
  static deleteBook(el){
      if(el.classList.contains('delete')){
        el.parentElement.parentElement.remove();
      }
  }
    static showAlert(message,className){
        const div=document.createElement('div');
        div.className=`alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container=document.querySelector('.container');
        const form=document.querySelector('#book-form');
        container.insertBefore(div,form);
        // vanish in 3 seconds
        setTimeout(()=>
            document.querySelector('.alert').remove(),3000);
    }

    static clearFeild(){
        document.querySelector('#title').value='';
        document.querySelector('#author').value='';
        document.querySelector('#isbn').value='';
   }

}

//store class
class store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books=[];
        }else{
        books=JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBooks(book){
        const books=store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
    static removeBooks(isbn){
        const books=store.getBooks();
        books.forEach((book,index)=>{
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books));
    }
}

//events:display book
document.addEventListener('DOMContentLoaded',ui.displayBooks);

//event:add book

//get values from form
document.querySelector('#book-form').addEventListener('submit',(e)=>{
    e.preventDefault();
    const title=document.querySelector('#title').value;
    const author=document.querySelector('#author').value;
    const isbn=document.querySelector('#isbn').value;

//Validate
if(title===''|| author===''||isbn===''){
    ui.showAlert('Please filt the feilds','danger');
}
else{
    //instantiate values 

    const book= new Book(title,author,isbn);

    //add bok to ui
    ui.addBookToList(book);
    //add book to store
    store.addBooks(book);
    // add success msg
    ui.showAlert('Book added','success');
    ui.clearFeild();
}
});
//event:delete book
document.querySelector('#book-list').addEventListener('click',(e)=>{
    // remove book from ui
    ui.deleteBook(e.target);

    //remove book from store
    store.removeBooks(e.target.parentElement.previousElementSibling.textContent);
    ui.showAlert('Book has been deleted','success');
});