import web3 from './web3';
import CampaignFactory from './build/Campaign.solCampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x99617A2819B6A806D097Ac9b71075Abb9eEAFA8D'
);

export default instance;
