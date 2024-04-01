import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../redux/actions/actionFetchBooks';
import { addBook } from '../redux/actions/actionAddBook';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SearchBooks = () => {
    
    const [title, setTitle] = useState('');
    const state = useSelector(state => state.search);
    const dispatch = useDispatch();

    /**
     * Submit book search form 
     * @param {Event} e 
     */
    const handleSubmit = e => {
        e.preventDefault();
        dispatch(fetchBooks(title))
    }

    const handleSaveBook = (title, author) => {
        const bookSaved = {
            title: title,
            author: author
        };

        dispatch(addBook(bookSaved));
        toast.success('Livre enregistré', {position: "bottom-right"})
    }

    const displayFetchedBooks = state.isLoading ? 
    (
        <div className="d-flex justify-content-center">
            <div className="spinner-border text-info" role='status'>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    ) : state.error !== '' ? 
    (
        <p>{state.error}</p>
    ) : 
    (
        state.fetchedBooks.map(book => {
            return (
                <div key={book.id} className="card mb-2">
                    <div className="card-header">
                        <div className="mb-0">
                            <button     
                                className='btn btn-link collapsed'
                                data-toggle="collapse"
                                data-target={`#${book.id}`}
                                aria-expanded="false"
                            >
                            {book.volumeInfo.title}   
                            </button>
                        </div>
                    </div>
                    <div id={book.id} className="collapse" data-parent="#accordion">
                        <div className="card-body">
                            {
                                book.volumeInfo.hasOwnProperty('imageLinks') &&
                                <img src={ book.volumeInfo.imageLinks.thumbnail } alt={book.volumeInfo.title}/>
                            
                            }
                            <br />
                            <h4 className='card-title'>Titre: {book.volumeInfo.title}</h4>
                            <h5 className='card-title'>Auteurs: { book.volumeInfo.authors }</h5>
                            <p className='card-text'>Description: { book.volumeInfo.description }</p>
                            <a 
                                className='btn btn-outline-secondary mr-2' 
                                target='_blank' 
                                rel='noopener noreferrer'
                                href={book.volumeInfo.previewLink}>
                                Plus d'infos</a>
                            <button 
                                className='btn btn-outline-secondary'
                                onClick={() => handleSaveBook(
                                    book.volumeInfo.title,
                                    book.volumeInfo.authors
                                )}
                                >
                                    Enregistrer
                            </button>
                        </div>
                    </div>
                </div> 
            )

        })

    )
    return (
        <Fragment>
            <main role='main'>
                <div className="jumbotron jumbotron-fluid">
                    <div className="container text-center">
                        <h1 className="display-4">BOOKS</h1>
                        <p>Indiquer le sujet du livre à rechercher sur Google API</p>
                        <form className='form-inline justify-content-center' onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input type="text" 
                                    className="form-control" 
                                    placeholder='Quoi rechercher ?'    
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}                
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <button className='btn btn-outline-secondary ml-3'>Rechercher</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="container" style={{minHeight: '200px'}}>
                    <div id="accordion">
                        { displayFetchedBooks }
                    </div>
                </div>
            </main> 
            <ToastContainer />
        </Fragment>
        
    )
}

export default SearchBooks
