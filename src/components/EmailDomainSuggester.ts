type EmailDomainSuggesterTypes = {
  input?: HTMLInputElement;
  datalistId?: string;
  additionalDomains?: string[];
};

export default class EmailDomainSuggester {
  datalist: HTMLDataListElement;
  input: HTMLInputElement;
  datalistId: string;
  domains: string[] = [
    'gmail.com',
    'hotmail.com',
    'outlook.com',
    'terra.com.br',
    'uol.com.br',
    'yahoo.com.br',
    'bol.com.br',
    'live.com',
  ];

  constructor(options: EmailDomainSuggesterTypes = {}) {
    Object.assign(this, options);
    this.datalist = document.createElement('datalist');

    let {
      input = document.querySelector('input[type="email"]') as HTMLInputElement,
      datalistId = 'email-options',
      additionalDomains = [],
    } = options;

    this.input = input;
    this.datalistId = datalistId;
    this.domains = [...this.domains, ...additionalDomains];

    this.init();
  }

  private listener(input: HTMLInputElement) {
    input.addEventListener('keyup', () => this.testValue(this.input.value));
  }

  private clearDataList() {
    this.datalist.innerHTML = '';
  }

  private testValue(value: string) {
    this.clearDataList();

    if (value.indexOf('@') != -1) {
      this.addToDatalist(value);
    }
  }

  private addToDatalist(email: string) {
    const [username, userDomain] = email.split('@');

    const filteredDomains = this.domains.filter(
      domain => domain.toLowerCase().indexOf(userDomain.toLowerCase()) > -1
    );

    filteredDomains.map(domain => {
      const email = `${username}@${domain}`;

      const element = document.createElement('option');
      element.setAttribute('value', email);

      this.datalist.appendChild(element);
    });

    this.input.insertAdjacentElement('afterend', this.datalist);
  }

  private init() {
    this.listener(this.input);
    this.datalist.setAttribute('id', this.datalistId);
    this.input.setAttribute('list', this.datalistId);
  }
}
