async function speak(text:string){
    if(!text)return;
    setSpeaking(true);
    try{
      const res=await fetch("https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM",{
        method:"POST",
        headers:{
          "xi-api-key":914bd3f8c90f40e769229bf13777de1a74ce6f58fd1e44971d002245aae0a1bf
          "Content-Type":"application/json",
          "Accept":"audio/mpeg"
        },
        body:JSON.stringify({
          text,
          model_id:"eleven_monolingual_v1",
          voice_settings:{stability:0.5,similarity_boost:0.75}
        })
      });
      const blob=await res.blob();
      const url=URL.createObjectURL(blob);
      const audio=new Audio(url);
      audio.onended=()=>setSpeaking(false);
      audio.play();
    }catch(e){
      setSpeaking(false);
    }
  }
