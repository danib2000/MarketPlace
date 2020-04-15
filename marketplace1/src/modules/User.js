
class User{
    id;
    userName;
    email;
    role;
    address;
    city;
    region;
    secondAddress;
    secondCity;
    secondRegion;
    walletAddress;
    infoAboutUser;
    firstName;
    lastName;
    
    setSellerInfo(address, city, region, secondaddress, secondcity, secondregion, walletAddress, about){
        this.address = address;
        this.city = city;
        this.region = region;
        this.secondAddress = secondaddress;
        this.secondCity = secondcity;
        this.secondRegion = secondregion;
        this.walletAddress = walletAddress;
        this.infoAboutUser = about;
    }
}
export default User;