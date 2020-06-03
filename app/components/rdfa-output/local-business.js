import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class RdfaOutputLocalBusinessComponent extends Component {
  @tracked localBusiness
  @tracked location
  @tracked categories = []
  @tracked openingHours = []
  @tracked rdfaSnippet

  @service fastboot;

  constructor() {
    super(...arguments);
    this.initInternalData();
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
    const name = this.localBusiness.name ? `<div property="schema:name">${this.localBusiness.name}</div>` : '';
    const description = this.localBusiness.description ? `<div property="schema:description">${this.localBusiness.description}</div>` : '';
    const website = this.localBusiness.url ? `<a property="schema:url" href="${this.localBusiness.url}">${this.localBusiness.url}</a>` : '';
    const email = this.localBusiness.email ? `<a property="schema:email" href="${this.localBusiness.email}">${this.localBusiness.email.slice('mailto:'.length)}</a>` : '';
    const phone = this.localBusiness.telephone ? `<a property="schema:telephone" content="${this.localBusiness.telephone}">${this.localBusiness.get('telephone').slice('tel:'.length)}</a>` : '';

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
        <div resource="${this.localBusiness.uri}"
             typeof="schema:LocalBusiness ${categories} ${nacebelUris}"
            prefix="schema: http://schema.org/ nacebel: http://data.gift/vocabularies/nace-bel/ skos: http://www.w3.org/2004/02/skos/core#">
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
    `;
  }
}
