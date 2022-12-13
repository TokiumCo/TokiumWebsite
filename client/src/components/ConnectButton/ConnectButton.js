import React, { useEffect, useState } from 'react'



const ConnectButton = () => {
  const getProvider = () => {
    const isPhantomInstalled = window.solana?.isPhantom
    if ("solana" in window) {
        const provider = window.solana;
        return provider;
    }
    if (window.solana) {
        if (isPhantomInstalled) {
            const provider = window.phantom;
            return provider;
        } else {
            const provider = window.solana;
            return provider;
        }
    } else {
        console.log('No solana injector found');
    }
  }

  const connect = async () => {
    if (!window.solana) {
      alert('Phantom Wallet not detected. Please connect with Phantom')
    }
    const provider = getProvider();
    if (provider) {
      let reponse = await provider.connect();
      var event = new Event('walletConnected', { bubbles: true, cancelable: false });
      window.dispatchEvent(event)
    }
    
  };

  
  return (
    <div  className='blackBackground width100 flex justifyCenter'>
      <button onClick={connect} className='greenThemeButton  buttonWidthStandard textBig' style={{height: '48px', borderRadius:"24px", color: 'black'}}>Connect Wallet</button>
    </div>
  )
}

export default ConnectButton