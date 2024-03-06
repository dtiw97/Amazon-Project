import {toDollar} from "../../script/utils/conversions.js"
console.log('cart');
describe('test suite: toDollar', ()=> {
  it('convert cents into dollar', () => {
    expect(toDollar(2095)).toEqual('20.95');
  })

  it('works with 0', () => { 
    expect(toDollar(0)).toEqual('0.00');
  })

  it('rounds up to nearest cent', () => {
    expect(toDollar(2000.5)).toEqual('20.01');
  })
})