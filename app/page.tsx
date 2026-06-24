const services = [
  "Projetos paisagísticos residenciais",
  "Jardins corporativos",
  "Manutenção de áreas verdes",
];

export default function Home() {
  return (
    <main className="page">
      <section className="hero" aria-labelledby="hero-title">
        <p className="eyebrow">Sobreiro Paisagismo</p>
        <h1 id="hero-title">Natureza planejada para transformar ambientes.</h1>
        <p className="heroText">
          Uma base moderna com React.js e Next.js para apresentar projetos,
          serviços e contatos da marca com performance e SEO desde o início.
        </p>
        <a className="cta" href="mailto:contato@sobreiro-paisagismo.com">
          Solicitar orçamento
        </a>
      </section>

      <section className="services" aria-labelledby="services-title">
        <h2 id="services-title">Serviços em destaque</h2>
        <ul>
          {services.map((service) => (
            <li key={service}>{service}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
