import Component from '@glimmer/component';
import { task } from 'ember-concurrency-decorators';
import { tracked } from '@glimmer/tracking';

export default class RdfaOutputLocalBusinessComponent extends Component {
  @tracked localBusiness
  @tracked location
  @tracked categories = []
  @tracked openingHours = []
  @tracked rdfaSnippet

  constructor() {
    super(...arguments);
    this.loadData.perform();
  }

  @task
  *loadData() {
    this.localBusiness = this.args.localBusiness;
    this.location = yield this.localBusiness.location;
    this.categories = (yield this.localBusiness.categories).toArray();
    this.openingHours = (yield this.localBusiness.openingHoursSpecifications).toArray();
    this.generateRdfaSnippet.perform();
  }

  @task
  *generateRdfaSnippet() {
    const name = this.localBusiness.name ? `<div property="schema:name">${this.localBusiness.name}</div>` : '';
    const description = this.localBusiness.description ? `<div property="schema:description">${this.localBusiness.description}</div>` : '';
    const website = this.localBusiness.url ? `<a property="schema:url" href="${this.localBusiness.url}">${this.localBusiness.url}</a>` : '';
    const email = this.localBusiness.email ? `<a property="schema:email" href="mailto:${this.localBusiness.email}">${this.localBusiness.email}</a>` : '';
    const phone = this.localBusiness.telephone ? `<a property="schema:telephone" href="tel:${this.localBusiness.telephone}">${this.localBusiness.telephone}</a>` : '';

    let location = '';
    if (this.location) {
      const street = this.location.streetAddress ? `<div property="schema:streetAddress">${this.location.streetAddress}</div>` : '';
      const postalCode = this.location.postalCode ? `<div property="schema:postalCode">${this.location.postalCode}</div>` : '';
      const city = this.location.city ? `<div property="schema:addressLocality">${this.location.city}</div>` : '';
      location = `
        <div property="schema:location" resource="${this.location.uri}" typeof="schema:PostalAddress">
          ${street}
          ${postalCode}
          ${city}
        </div>`;
    }

    let openingHours = '';
    for (let openingHour of this.openingHours) {
      const dayOfWeek = yield openingHour.dayOfWeek;
      const day = dayOfWeek ? `<span property="schema:dayOfWeek" href="">${dayOfWeek.name}</span>` : '';
      const opens = openingHour.opens ? `<span property="schema:opens" content="${openingHour.opens}">${openingHour.opens}</span>` : '';
      const closes = openingHour.closes ? `<span property="schema:closes" content="${openingHour.closes}">${openingHour.closes}</span>` : '';
      const validFrom = openingHour.validFrom ? `<span property="schema:validFrom" content="${openingHour.validFrom}">${openingHour.validFrom}</span>` : '';
      const validThrough = openingHour.validThrough ? `<span property="schema:validThrough" content="${openingHour.validThrough}">${openingHour.validThrough}</span>` : '';
      openingHours += `
<div property="schema:openingHoursSpecification" resource="${this.openingHour.uri}" typeof="schema:OpeningHoursSpecification">
  ${day}: van ${opens} tot ${closes}
  ${validFrom} - ${validThrough}
</div>`;
    }

    const categories = this.categories.map(c => c.uri).join(' ');

    this.rdfaSnippet = `
<div resource="${this.args.localBusiness.uri}" typeof="schema:LocalBusiness ${categories}" prefix="schema: http://schema.org/">
  ${name}
  ${description}
  ${website}
  ${email}
  ${phone}
  ${location}
  ${openingHours}
</div>
    `;
  }
}
