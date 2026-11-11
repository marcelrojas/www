# Arquitectura Frontend y Design Tokens de Apple
A continuación, se presenta el desglose estructurado sobre la ingeniería detrás de las interfaces web de Apple (apple.com, developer.apple.com, apps.apple.com), recopilado para proceder con el desarrollo del sistema de siseño y componentes interactivos.

## 1. Ingeniería Inversa de los Design Tokens
El análisis de las metodologías de Apple Marcom (Interactive Experiences) revela un sistema de diseño estrictamente cerrado pero deductivamente brillante, enfocado en el rendimiento y la precisión geométrica:

Sistema Tipográfico Híbrido: * Textos de Exhibición (Hero/H1): Emplean matemáticas fluidas (clamp()) para que la tipografía escale dinámicamente con el viewport, usando siempre unidades rem por accesibilidad.

Textos de Cuerpo (Body): Utilizan escalado discreto a través de breakpoints fijos. Evitan los valores fraccionados para garantizar que los párrafos mantengan un renderizado nítido de los píxeles.

Tracking Dinámico: El espacio entre letras se vuelve más negativo a medida que la fuente crece para mantener la cohesión óptica.

Gestión de Variables: Siguen la separación semántica del W3C (Tokens Primitivos vs. Semánticos) y aplican un scoping local agresivo a nivel de componente para evitar la cascada accidental de estilos.

Integración Nivel-Hardware: Implementan llamadas directas a las tipografías del sistema (SF Pro) y emplean propiedades CSS indocumentadas (como -apple-system-glass-material) para delegar el difuminado acrílico al motor gráfico nativo del sistema operativo.

## 2. Estructuración del Sistema (JSON a CSS)
Se diseñó un modelo práctico para replicar este sistema en entornos modernos:

Single Source of Truth: Se estructuró un archivo tokens.json que emula la arquitectura de Apple, separando la paleta de colores base y las definiciones tipográficas fluidas/discretas.

Compilación y Herramientas: Se planteó el flujo de trabajo utilizando Style Dictionary (gestionado eficientemente vía pnpm) para transformar el JSON en variables CSS utilizables, garantizando la inyección de código limpio y el cumplimiento de estándares de usabilidad (A11y) y contraste WCAG.

## 3. Arquitectura Profunda de CSS Custom Properties
Se profundizó en cómo Apple manipula el DOM para lograr una fluidez visual extrema (cercana a los 60/120Hz) evitando el Layout Thrashing:

El Fin del :root Monolítico: En lugar de saturar el documento global, las variables de tema (como luz/oscuridad) se reasignan exclusivamente dentro de las capas contextuales o selectores específicos de cada módulo.

Animaciones por Composición: Las interacciones vinculadas al scroll no animan las propiedades CSS tradicionales. En su lugar, un observador en JavaScript actualiza una única variable local (ej. --scroll-progress), permitiendo que CSS procese matemáticamente transformaciones aceleradas por GPU (transform, opacity).

Diseño Espacial Matemático: Uso intensivo de calc(), min(), max() y clamp() combinados con variables locales para crear layouts adaptativos sin depender excesivamente de Media Queries. Se recomendó el uso de herramientas como Lightning CSS para procesar esta sintaxis moderna.


 <section aria-labelledby="faq-heading">
    <div class="content">
      <h2 id="faq-heading">How all this work</h2>
      <p>Here are some frequently asked questions about my services.</p>

      <ul>
        <li>
          <FAQItem question="What types of projects do you typically work on?" answer="I typically work on web development and design projects, ranging from small business websites to larger e-commerce platforms. I also take on UI/UX design projects and consulting engagements." />
        </li>
        <li>
          <FAQItem question="What is your process for starting a new project?" answer="My process begins with an initial consultation to understand your needs and goals. From there, I create a proposal outlining the scope, timeline, and deliverables. Once approved, I move into the design and development phases, keeping you updated throughout." />
        </li>
        <li>
          <FAQItem question="What are your rates for services?" answer="My rates vary depending on the scope and complexity of the project. I offer both fixed-price packages and hourly rates. Please contact me for a detailed quote based on your specific needs." />
        </li>
        <li>
          <FAQItem question="Do you offer revisions during the design process?" answer="Yes, I include a set number of revisions in my design packages to ensure that the final product meets your expectations. Additional revisions can be accommodated for an extra fee." />
        </li>
        <li>
          <FAQItem question="Can you work with existing websites?" answer="Absolutely! I can help with redesigning, optimizing, or adding new features to your existing website. I can also assist with migrating your site to a new platform if needed." />
        </li>
        <li>
          <FAQItem question="What information do you need to get started?" answer="To get started, I typically need details about your business, target audience, project goals, and any specific features or design preferences you have in mind. The more information you can provide upfront, the better I can tailor my services to your needs." />
        </li>
        <li>
          <FAQItem question="How do you ensure the quality of your work?" answer="I follow best practices in web development and design, including thorough testing across different devices and browsers. I also seek feedback from clients at various stages to ensure the project aligns with their vision and requirements." />
        </li>
        <li>
          <FAQItem question="What if I need help after the project is completed?" answer="I offer ongoing support and maintenance packages to help you manage and update your website as needed. I'm also available for consultations if you have questions or need assistance with future projects." />
        </li>
        <li>
          <FAQItem question="Do you provide training on how to manage my website?" answer="Yes, I can provide training sessions to help you understand how to manage and update your website. This can include tutorials on using content management systems, making basic updates, and best practices for website maintenance." />
        </li>
        <li>
          <FAQItem question="What if I'm not satisfied with the final product?" answer="Client satisfaction is my top priority. I work closely with you throughout the project to ensure your vision is realized. If you're not satisfied with the final product, I will work with you to make necessary adjustments until we reach a solution that meets your expectations." />
        </li>
        <li>
          <FAQItem question="How do you handle project deadlines?" answer="I set realistic deadlines based on the project scope and complexity. I communicate regularly with clients to provide updates on progress and address any potential delays promptly." />
        </li>
        <li>
          <FAQItem question="Can you collaborate with my existing team?" answer="Yes, I am happy to collaborate with your existing team, whether they are designers, marketers, or other developers. Clear communication and teamwork are essential for the success of any project." />
        </li>
        <li>
          <FAQItem question="What if I have a limited budget?" answer="I understand that budgets can vary, and I strive to offer flexible solutions that can accommodate different financial constraints. During our initial consultation, we can discuss your budget and explore options that deliver value without compromising quality." />
        </li>
        <li>
          <FAQItem question="Do you provide custom designs or use templates?" answer="I specialize in creating custom designs tailored to your brand and audience. However, I can also work with templates if that aligns better with your budget and timeline." />
        </li>
        <li>
          <FAQItem question="What technologies do you use for web development?" answer="I primarily use modern web technologies such as HTML5, CSS3, JavaScript, and frameworks like React or Astro. I also ensure that websites are optimized for performance and accessibility." />
        </li>
        <li>
          <FAQItem question="How do you ensure my website is secure?" answer="I implement best practices for web security, including using HTTPS, keeping software and plugins up-to-date, and following secure coding standards. I also provide guidance on maintaining security post-launch." />
        </li>
        <li>
          <FAQItem question="Can you integrate third-party services into my website?" answer="Yes, I can integrate various third-party services such as payment gateways, analytics tools, CRM systems, and more to enhance the functionality of your website." />
        </li>
        <li>
          <FAQItem question="What services do you offer?" answer="I offer a range of services including web development, UI/UX design, and consulting to help businesses establish a strong online presence." />
        </li>
        <li>
          <FAQItem question="How can I get a quote for my project?" answer="You can get a quote by contacting me through the contact form on my website or by joining the loop using the button above." />
        </li>
        <li>
          <FAQItem question="Do you work with clients internationally?" answer="Yes, I work with clients from around the world. I am comfortable communicating and collaborating across different time zones to ensure a smooth project experience." />
        </li>
        <li>
          <FAQItem question="What is your typical turnaround time for projects?" answer="Turnaround times vary depending on the scope and complexity of the project. I will provide an estimated timeline during our initial consultation." />
        </li>
        <li>
          <FAQItem question="Can you help with website hosting and domain registration?" answer="Yes, I can assist you with choosing a hosting provider and registering a domain name as part of my services." />
        </li>
        <li>
          <FAQItem question="What if I need additional features after the project is completed?" answer="I am available for future enhancements and feature additions. We can discuss your needs and I can provide a quote for any additional work required." />
        </li>
        <li>
          <FAQItem question="How do you handle communication during the project?" answer="I maintain regular communication through email, video calls, and project management tools to keep you updated on progress and address any questions or concerns promptly." />
        </li>
        <li>
          <FAQItem question="Do you offer discounts for non-profit organizations?" answer="Yes, I offer special rates for non-profit organizations. Please contact me to discuss your project and see how I can support your mission." />
        </li>
        <li>
          <FAQItem question="Do you offer ongoing support after project completion?" answer="Yes, I offer ongoing support and maintenance packages to ensure your website remains up-to-date and secure." />
        </li>
        <li>
          <FAQItem question="Can you help with content creation for my website?" answer="While my primary focus is on web development and design, I can provide guidance on content strategy and recommend professional content creators if needed." />
        </li>
        <li>
          <FAQItem question="What if I need a website redesign?" answer="I offer website redesign services to help refresh and modernize your online presence. We can discuss your goals and create a plan to update your site effectively." />
        </li>
        <li>
          <FAQItem question="Can you help with SEO and digital marketing?" answer="While my primary focus is on web development and design, I can provide basic SEO recommendations and refer you to trusted digital marketing professionals if needed." />
        </li>
      </ul>
    </div>
  </section>