export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>
          Hunterpedia es un proyecto de fans, sin fines de lucro y con fines educativos. Hunter x Hunter es
          propiedad de Yoshihiro Togashi, Shueisha y sus respectivos licenciatarios.
        </p>
        <p>
          Datos de personajes e imágenes obtenidos de la API pública{' '}
          <a href="https://hxh-api.onrender.com" target="_blank" rel="noreferrer">
            hxh-api
          </a>
          . Este sitio no aloja ni reclama derechos sobre esas imágenes.
        </p>
      </div>
    </footer>
  );
}
