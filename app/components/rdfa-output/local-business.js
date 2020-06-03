import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { later } from '@ember/runloop';

export default class RdfaOutputLocalBusinessComponent extends Component {
  @tracked localBusiness
  @tracked location
  @tracked categories = []
  @tracked openingHours = []
  @tracked rdfaSnippet
  @tracked succesMessage = false

  @service fastboot;

  constructor() {
    super(...arguments);
    this.initInternalData();
  }

  @action
  copySuccess() {
    this.succesMessage = true;

    later(this, function() {
      this.succesMessage = false;
    }, 800);
  }

  initInternalData() {
    this.localBusiness = this.args.localBusiness;
    this.location = this.localBusiness.location;
    this.categories = this.localBusiness.categories.toArray();
    this.naceBelCodes = this.localBusiness.naceBelCodes.toArray();
    this.openingHours = this.localBusiness.openingHoursSpecifications.toArray();
    this.generateRdfaSnippet();
  }

  generateRdfaSnippet() {
    const styles = `<style>[property="schema:name"],[property="schema:description"],[property="schema:url"],[property="schema:email"],[property="schema:telephone"],[property="schema:address"],[property="schema:openingHoursSpecification"],[typeof="nacebel:NaceBelCode skos:Concept"]{font-family:sans-serif;color:#2A2D31;font-size:16px;line-height:1.5}a[property]{color:#0E5EB8}a[property]:hover{color:#0F6FD7}a[property]:focus{outline:2px solid #FEE539}[typeof="nacebel:NaceBelCode skos:Concept"]{display:inline-block;font-size:13px;color:#69717C;background-color:#F4F5F6;padding:0 2px;border-radius:2px;margin-bottom:6px}[property="schema:name"]{display:block;font-family:sans-serif;font-weight:600;font-size:21px;margin-bottom:12px}[property="schema:description"]{display:block;font-family:sans-serif;font-weight:400;font-size:18px;margin-bottom:12px}[property="schema:url"],[property="schema:email"],[property="schema:telephone"]{display:inline-block;margin-bottom:3px;margin-right:12px}[property="schema:url"]:after,[property="schema:email"]:after{display:inline-flex;content:"/";color:#2A2D31;margin-left:12px}[property="schema:address"]{display:block;margin-bottom:24px;margin-top:24px}[property="schema:openingHoursSpecification"]{}[property="schema:dayOfWeek"]{font-weight:600}[property="schema:validFrom"],[property="schema:validThrough"]{display:inline-block;font-size:13px;color:#69717C;background-color:#F4F5F6;padding:0 2px;border-radius:2px}[property="schema:image"]{display:block;margin-top:24px}[property="schema:image"] img{display:block;max-width:400px;border:1px solid #E6E8EB}.au-c-rdfa-snippet{border:1px solid #E6E8EB;padding:12px;border-radius:2px}</style>`
    const name = this.localBusiness.name ? `<div property="schema:name">${this.localBusiness.name}</div>` : '';
    const description = this.localBusiness.description ? `<div property="schema:description">${this.localBusiness.description}</div>` : '';
    const website = this.localBusiness.url ? `<a property="schema:url" href="${this.localBusiness.url}">${this.localBusiness.url}</a>` : '';
    const email = this.localBusiness.email ? `<a property="schema:email" href="${this.localBusiness.email}">${this.localBusiness.email.slice('mailto:'.length)}</a>` : '';
    const phone = this.localBusiness.telephone ? `<a property="schema:telephone" href="${this.localBusiness.telephone}" content="${this.localBusiness.telephone}">${this.localBusiness.get('telephone').slice('tel:'.length)}</a>` : '';

    let location = '';
    if (this.location) {
      const street = this.location.get('streetAddress') ? `<div property="schema:streetAddress">${this.location.get('streetAddress')}</div>` : '';
      const postalCode = this.location.get('postalCode') ? `<div property="schema:postalCode">${this.location.get('postalCode')}</div>` : '';
      const city = this.location.get('city') ? `<div property="schema:addressLocality">${this.location.get('city')}</div>` : '';
      location = `
        <div property="schema:address" resource="${this.location.get('uri')}" typeof="schema:PostalAddress">
          ${street}
          ${postalCode}
          ${city}
        </div>`;
    }

    let openingHours = '';
    for (let openingHour of this.openingHours) {
      const dayOfWeek = openingHour.dayOfWeek;
      const day = dayOfWeek ? `<span property="schema:dayOfWeek" href="${dayOfWeek.get('uri')}">${dayOfWeek.get('name')}</span>` : '';
      const opens = openingHour.opens ? `<span property="schema:opens" content="${openingHour.get('opens')}" datatype="xsd:time">${openingHour.get('opens')}</span>` : '';
      const closes = openingHour.closes ? `<span property="schema:closes" content="${openingHour.get('closes')}" datatype="xsd:time">${openingHour.get('closes')}</span>` : '';
      const validFromStr = openingHour.validFrom ? openingHour.validFrom.toISOString().substr(0, 10) : null;
      const validFrom = validFromStr ? `<span property="schema:validFrom" content="${validFromStr}" datatype="xsd:date">${validFromStr}</span>` : '';
      const validThroughStr = openingHour.validThrough ? openingHour.validThrough.toISOString().substr(0, 10) : null;
      const validThrough = validThroughStr ? `<span property="schema:validThrough" content="${validThroughStr}" datatype="xsd:date">${validThroughStr}</span>` : '';
      openingHours += `
        <div property="schema:openingHoursSpecification" resource="${openingHour.uri}" typeof="schema:OpeningHoursSpecification">
          ${day}: van ${opens} tot ${closes}
          ${validFrom} - ${validThrough}
        </div>`;
    }
    const categories = this.categories.map(c => c.uri).join(' ');

    let naceBelCodes = '';
    for(const code of this.naceBelCodes){
      const codeString = `<span resource=${code.uri} typeof="nacebel:NaceBelCode skos:Concept">
                            <span property="skos:prefLabel">${code.label}</span>
                          </span>`;
      naceBelCodes += codeString;
    }

    const nacebelUris = this.naceBelCodes.map(c => c.uri).join(' ');

    let image = '';
    if (this.localBusiness.imageUrl) {
      image = `<span property="schema:image" resource="${this.localBusiness.imageUrl}">
                        <img src="${this.localBusiness.imageUrl}"/>
                   </span>`;
    }

    this.rdfaSnippet = `
      <div class="copy-snippet">
        ${styles}
        <div resource="${this.localBusiness.uri}"
             typeof="schema:LocalBusiness ${categories} ${nacebelUris}"
            prefix="schema: http://schema.org/ nacebel: http://data.gift/vocabularies/nace-bel/ skos: http://www.w3.org/2004/02/skos/core#" class="au-c-rdfa-snippet">
          ${naceBelCodes}
          ${name}
          ${description}
          ${website}
          ${email}
          ${phone}
          ${location}
          ${openingHours}
          ${image}
        </div>
      </div>
    `;
  }
}
