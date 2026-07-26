import box from './test.js'
import circle from './app.js'

const parent =()=>{
    return React.createElement('div',{id:parent},[box(),circle()])
}

export default parent