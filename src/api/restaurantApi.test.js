const restaurantApi = require("./restaurantApi")
// @ponicode
describe("restaurantApi.getRestaurants", () => {
    test("0", () => {
        let callFunction = () => {
            restaurantApi.getRestaurants()
        }
    
        expect(callFunction).not.toThrow()
    })
})
