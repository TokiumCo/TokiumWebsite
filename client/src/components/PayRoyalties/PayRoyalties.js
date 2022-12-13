import Tokium from '@tokium.co/tokiumsdk';
import React, { useRef, useState, useEffect, useCallback } from 'react'
import { formatWalletAddress } from '../../helpers/general';
import ConnectButton from '../ConnectButton/ConnectButton';
import ImageImporter from '../Helpers/ImageImporter';
import { Connection } from '@solana/web3.js';
import './PayRoyalties.css'

const connection = new Connection(`https://solana-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_KEY}`, 'confirmed');

const PayRoyalties = () => {
  const [pubKey, setPubKey] = useState('');
  const [isConnected, setIsConnected] = useState(!!window.solana?.isConnected);
  const [loading, setLoading] = useState(false);
  const collectionRef = useRef();
  const [ownedNFTs, setOwnedNFTs] = useState(null);
  const [royaltyDetails, setRoyaltyDetails] = useState(null);
  const [tokium, setTokium] = useState('');

   
  const search = async () => {
    setLoading(true);
    const collection = collectionRef.current.value;
    collectionRef.current.value = '';
    const _tokium = new Tokium(collection, pubKey)
    setTokium(_tokium)
    if (!collection) return alert('Please enter collection link');
    const userNFTs = await _tokium.getOwnedCollectionNFTs();
    setOwnedNFTs(userNFTs);
    const getRoyaltyDetailts = await _tokium.getRoyaltyDetails();
    setRoyaltyDetails(getRoyaltyDetailts);
    setLoading(false)
  };

  const setConnected = () => {
    setIsConnected(true);
    setPubKey(String(window.solana.publicKey))
  }

  useEffect(() => {
    window.addEventListener('walletConnected', setConnected)

    return () => window.removeEventListener('walletConnected', setConnected)
  }, [])

  

  const payRoyalties = async (index) => {
    const NFT = royaltyDetails[index];
    if (NFT.royaltiesPaid) return alert('Already paid');
    const pay = await tokium.paySolanaRoyalties(connection, window.solana, ownedNFTs[index], NFT.royaltiesOwing);
    if (pay) {
      console.log('paid')
      let royalties = [...royaltyDetails];
      royalties[index].royaltiesPaid = true;
      royalties[index].royaltiesOwing = 0;
      setRoyaltyDetails([...royalties]);
    } else {
      console.log('was not able to pay')
    }
  }

  const NFTContainer = (nft, key) => {

    const getButtonContent = (status) => {
      if (status === 'loading') return 'Loading...';
      else if (status === 'paid') return 'Paid!';
      else return 'Pay Royalties';
    }

    const getNftStatus = (index) => {
      if (!royaltyDetails) return 'loading';
      else if (royaltyDetails[index].royaltiesPaid) return 'paid';
      else return 'unpaid';
    }

    const status = getNftStatus(key);
    
    return (
      <div key={key} className='flex flexCol white justifySpaced padHorMed padding8 alignCenter borderRadius' style={{ border: '2px solid gray', maxWidth: '300px', margin: '12px' }}>
      <ImageImporter source={nft.image} height={200} />
        <div className='textBig'>{nft.name}</div>
        {royaltyDetails && <div className='marVerSmall'>You owe {royaltyDetails[key].royaltiesOwing} SOL</div>}
        <div className='flex alignCenter marVerMed'>
          
          <button onClick={()=>payRoyalties(key)} className={`${status === 'paid'? 'greenThemeButton' : 'yellowThemeButton'} borderRadius`} style={{ height: '32px', width: '200px' }}>
            {getButtonContent(status)}
          </button>
      </div>

    </div>

    )
  }

  const CollectionLinkInput = () => (
    <div className='flex marVerSection width100 justifyCenter marBottonHeader alignCenter'>
      <input disabled={loading} className='inputLink' placeholder='Enter MagicEden Collection Link...' style={{borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px', height:'32px', border: '0px'}} ref={collectionRef}></input>
      <button disabled={loading} onClick={search} className='white bold textMed hover' style={{width: '100px', height: '32px', borderTopRightRadius: '12px', borderBottomRightRadius: '12px', backgroundColor: 'var(--hotpink)', border: '0px'}}>{loading? 'Loading...' : 'Search'}</button>
      
    </div>
  )

  const RenderPayRoyalties = () => (
    <div className='width100 flex flexWrap justifyCenter flexCol alignCenter padHorMed' style={{paddingBottom: '64px'}}>
      <div className='textHuge white marVerSection bold textCenter'>Pay Your Royalties!</div>
      {pubKey && <div className='white marVerSmall'>You are connected to {formatWalletAddress(pubKey)}</div>}
      <div className='white marVerSmall textCenter'>Search by MagicEden collection link and select the NFT</div>
      {CollectionLinkInput()}
      <div className='marVerSmall white flex'>Tested with &nbsp; <ImageImporter source="https://phantom.app/img/phantom-logo.svg" height={24} /></div>
      <div className='width100 flex flexWrap justifyCenter marVerSection'>
        {
          ownedNFTs && ownedNFTs.map((nft, index) => NFTContainer(nft, index))
        }
      </div>
      {
        ownedNFTs && ownedNFTs.length === 0 && <div className='white textCenter'>Hmm...you have no NFTs from the searched collection 🤔 </div>
      }
      
    </div>
  );

  const ConnectionPrompt = () => (
    <div className='width100 flex flexWrap justifyCenter flexCol alignCenter'>
      <div className='textHuge white marVerLarge bold textCenter'>Pay Your Royalties!</div>
      <div className='white marVerSmall'>You are not connected to phantom.</div>
      <br />
      <ConnectButton ></ConnectButton>
    </div>
  )

  return (
    <div className='flex alignCenter justifyCenter payRoyaltiesContainer' style={{}}>
      {!isConnected && <ConnectionPrompt></ConnectionPrompt>}
      {isConnected && RenderPayRoyalties()}
    </div>
  )
}

export default PayRoyalties