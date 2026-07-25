import box from './app.js'
import circle from './test.js'

const parent =()=>{

    return React.createElement('div',{id:'parent'},[box(),circle()])
}

export default parent