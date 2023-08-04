import { useEffect, useState } from 'react';
import { ColorRing } from  'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getImages } from 'services/getImages';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import css from './App.module.css';

const App = () => {

  const [inputSearch, setInputSearch] = useState('');
  const [hits, setHits] = useState([]);
  const [page, setPage] = useState(1);
  const [modalImageURL, setModalImageURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [endOfCollection, setEndOfCollection] = useState(false);
  const [tags, setTags] = useState('');

  useEffect(() => {
     //перший рендер, inputSearch порожній, не робимо http-запит
    if (!inputSearch) return;
    
    const fetchImages = async () => {

      try {
        setLoading(true);

        const data = await getImages(inputSearch, page);

        setHits(prevHits => [...prevHits, ...data.hits]);

        if (!data.totalHits) {
          toast.error(`No results found for ${inputSearch}`);
        }

        const totalPages = Math.ceil(data.totalHits / 12);

        if (page === totalPages) {
          setEndOfCollection(true);
          toast.error('No more pictures');
        }
      } catch (error) {
        toast.error(`Something goes wrong. Please, try again.`);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, [inputSearch, page]);

  const handleFormSubmit = inputSearch => {
    setInputSearch(inputSearch);
    setPage(1);
    setHits([]);
    setEndOfCollection(false);
  }

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  }

  const openModal = (largeImageURL, tags) => {
    setShowModal(true);
    setModalImageURL(largeImageURL);
    setTags(tags);
  }

  const closeModal = () => {
    setShowModal(false);
    setModalImageURL('');
  }

    const showLoadMoreBtn = hits.length > 0 && !endOfCollection; 

    return (
      <div className={css.app}>

        <Searchbar onSubmit={handleFormSubmit} />

        {loading && 
          <Loader>
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        </Loader>}

        {hits && 
          <ImageGallery>
            <ImageGalleryItem images={hits} onImageClick={openModal} />
          </ImageGallery>
          }

        {showLoadMoreBtn && 
          <Button onBtnClick={() => handleLoadMore()} />
        } 

        {showModal &&
          <Modal onClose={closeModal}>
          <img src={modalImageURL} alt={tags} />
        </Modal>}

        <ToastContainer autoClose={3000} theme="dark" closeButton={false} />
      </div>
    )
}

export default App;
