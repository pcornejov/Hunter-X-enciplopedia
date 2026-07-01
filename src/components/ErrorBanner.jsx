export default function ErrorBanner({ message }) {
  return (
    <div className="banner banner-error">
      No se pudo conectar con la API de Hunter x Hunter ({message}). Se muestra el contenido curado
      disponible localmente con imágenes de reemplazo mientras la API vuelve a estar disponible.
    </div>
  );
}
