import Tokium from '@tokium.co/tokiumsdk';
import React, { useRef, useState } from 'react';
import './DemoPage.css';
import { Lockscreen, TokiumProvider } from '@tokium.co/tokiumwrapper';

 
const DemoPage = () => {
  const [magicEdenURL, setMagicEdenURL] = useState("https://magiceden.io/marketplace/claynosaurz")
  const [pubkey, setPubkey] = useState("BL7GjLtjTB7bGd5s3hfaLCxSJvg1NyFk3Rs4vmMChcRk");
  
  
  const updateStatus = (status) => {
    switch (status) {
      case 'noNFTs':
        setMagicEdenURL('https://magiceden.io/marketplace/claynosaurz');
        setPubkey('jMrEQWGaF5Z6Hu6iUfBovP6KBZUMi5A66oLqJ9KnQKb')
        break;
      case 'unpaid':
        setMagicEdenURL('https://magiceden.io/marketplace/gmers');
        setPubkey('jMrEQWGaF5Z6Hu6iUfBovP6KBZUMi5A66oLqJ9KnQKb');
        break;
      case 'paid':
        setMagicEdenURL('https://magiceden.io/marketplace/drippies');
        setPubkey('jMrEQWGaF5Z6Hu6iUfBovP6KBZUMi5A66oLqJ9KnQKb')
        break;
      default:
        setMagicEdenURL('https://magiceden.io/marketplace/shiba_corp');
        setPubkey('jMrEQWGaF5Z6Hu6iUfBovP6KBZUMi5A66oLqJ9KnQKb');
    }
  }
 
  return (
    <TokiumProvider pubkey={pubkey} collection={magicEdenURL}>
      <div className="flex flexCol alignCenter white" style={{padding: '12px'}}>
        <div className='textHuge bold white textCenter'>Tokium Front-End Gate Demo</div>
        <div className='marVerMed'>This is what users will see depending on royalty payment status. Click buttons below to toggle different views.</div>
        <div id="interface" className='marVerSmall'>
          <button className='greenThemeButton margin4 borderRadius' style={{height: '32px'}} onClick={()=>updateStatus('noNFTs')}>Not Holding Correct NFT</button>
          <button className='greenThemeButton margin4 borderRadius' style={{height: '32px'}} onClick={()=>updateStatus('unpaid')}>Royalties Not Paid</button>
          <button className='greenThemeButton margin4 borderRadius' style={{height: '32px'}} onClick={()=>updateStatus('paid')}>Royalties Have Been Paid</button>
        </div>
        <div className='flex justifyCenter width100 marVerHuge flexWrap'>
          <Lockscreen style={{ maxWidth: '370px', marginLeft: '24px', minWidth: '300px' }}>
            <div style={{maxWidth: '600px', marginLeft: '24px'}}>
              This content is royalty gated. If you are seeing this message, royalties were paid for your NFT!
            </div>
          </Lockscreen>
          
        </div>

        <div className='marVerSection textCenter' style={{paddingBottom: '200px'}}>
          <div className='textHuge bold'>Tokium API</div>
          <br></br>
          <div>Tokium comes with the fastest NFT API on Solana. View it <div style={{color: 'var(--hotpink)'}} onClick={()=>{window.open("https://oyn.at/nftAnalyzer", "blank")}}>here</div></div>
        </div>
            
        </div>
    </TokiumProvider>
  )
}

export default DemoPage