/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import memeData from '../memeData';

function Meme() {
  const [meme, setMeme] = useState({
    topText: '',
    bottomText: '',
    randomImage: 'http://i.imgflip.com/1bij.jpg',
  });

  const [allMeme, setAllMeme] = useState([]);

  useEffect(() => {
    fetch(`https://api.imgflip.com/get_memes`)
      .then((response) => response.json())
      .then((data) => setAllMeme(data.data.memes));
  }, []);

  console.log(allMeme);

  const handleMeme = () => {
    const randomNumber = Math.floor(Math.random() * allMeme.length);
    const url = allMeme[randomNumber].url;

    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        [name]: value,
      };
    });
  };

  return (
    <main>
      <div className='form'>
        <div className='top'>
          <label className='label-text'>Top Text</label>
          <input
            type='text'
            placeholder='Enter top text'
            className='top-text-input'
            name='topText'
            value={meme.topText}
            onChange={handleChange}
          />
        </div>
        <div className='bottom'>
          <label className='label-text'>Bottom Text</label>
          <input
            type='text'
            placeholder='Enter bottom text'
            className='bottom-text-input'
            name='bottomText'
            value={meme.bottomText}
            onChange={handleChange}
          />
        </div>

        <button className='form-button' onClick={handleMeme}>
          Get a new meme image 🖼
        </button>
      </div>
      <div className='meme-container'>
        <img src={meme.randomImage} alt='Meme Image' className='meme-image' />
        <h2 className='meme--text top'>{meme.topText}</h2>
        <h2 className='meme--text bottom'>{meme.bottomText}</h2>
      </div>
    </main>
  );
}

export default Meme;
