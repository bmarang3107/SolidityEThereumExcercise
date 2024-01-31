import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
        JSON.parse(CampaignFactory.interface),
        '0x06b6EBe4C4a3A4BA47ee588C1261F2078747b053'
);

export default instance;

