import React from 'react'
import './HealthBar.css'

const HealthBar = () => {
  return (
    <div>HealthBar</div>
  )
}

export default HealthBar

/* 
gios
goal: 
- is to make healthbar for player/ enemy
- decreases when hit
- resets every round
input:
- when ever fighter is hit, hp goes down (onclick for now)
output:
- visually render hp going down
- when hp is on final straw, it turns red
setup:
- make component for hp
- setup onclick on trigger img in game
- setup css styling for both
- make logic in HealthBar

html
<progress class='HealthBar' id="health" value="100" max="100"></progress>

css
.HealthBar {
  height: 100px;
  width: 300px;
}

js/react
let health = document.getElementById("health")
health.value -= 20;

*/
