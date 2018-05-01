import { openCart, addItems, site } from './injectState';
import { ZygoteContainer } from './components/containers';
import ZygoteToggleButton from './components/zygoteToggleButton';

function initZygoteButtons() {
  document.addEventListener('click', e => {
    const dataId = e.target.dataset.id;
    const dataPrice = e.target.dataset.price;
    if (dataId && dataPrice) {
      const data = e.target.dataset;
      let updated = {};
      Object.keys(data).map(k => {
        updated[k] = data[k];
      });
      if (!updated.qty) updated.qty = 1;

      addItems([updated]);
      if (data.openCart) {
        openCart();
      }
      if (data.site) {
        site(data.site);
      }
    }
  });
}

function queryRender(query, component) {
  const els = document.querySelectorAll(`[data-zygote-${query}]`);
  for (let i = els.length; i--; ) {
    render(component, els[i]);
    els[i].dataset.zygoteProcess = true;
  }
}

class ZygoteInject {
  constructor(site = '') {
    this.site = site;
    site(site);
    this.inject();
    initZygoteButtons();
  }
  inject() {
    queryRender('button', <ZygoteToggleButton />);
    queryRender('modal', <ZygoteContainer />);
  }
}

export default ZygoteInject;