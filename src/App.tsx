function speak(text:string){
    if(!window.speechSynthesis)return;
    window.speechSynthesis.cancel();
    setTimeout(()=>{
      const u=new SpeechSynthesisUtterance(text);
      const vs=window.speechSynthesis.getVoices();
      const fv=vs.find(v=>v.name==="Google UK English Female")
        ||vs.find(v=>/female|zira|hazel|susan/i.test(v.name));
      if(fv)u.voice=fv;
      u.rate=0.85;u.pitch=1.1;u.lang="en-GB";
      u.onstart=()=>setSpeaking(true);
      u.onend=()=>setSpeaking(false);
      // Chrome bug fix - keep speech synthesis alive
      const interval=setInterval(()=>{
        if(!window.speechSynthesis.speaking){clearInterval(interval);return;}
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      },10000);
      window.speechSynthesis.speak(u);
    },200);
  }
