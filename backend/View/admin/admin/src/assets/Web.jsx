import React from 'react'
import PeerReel from './PeerReel'
import Subscription from './Subcription'
import Utube from './Utube'
import VoicetoVoice from './VoicetoVoice'
import Landing from '../Landing'
import DisplayCourse from '../DisplayCourse'

export default function Web() {
  return (
    <div>
      < Landing/>
<DisplayCourse/>
      <Utube/>
    <VoicetoVoice/>
      <Subscription/>
    </div>
  )
}
