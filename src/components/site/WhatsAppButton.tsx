import { company } from "@/lib/site";

/**
 * Floating WhatsApp action, bottom-left so it never collides with the chat
 * widget (bottom-right). Opens a wa.me thread with a prefilled message.
 */
export function WhatsAppButton() {
  // No number configured yet, so there is nothing to link to.
  if (!company.whatsappHref) return null;

  return (
    <a
      href={company.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 left-5 z-50 flex items-center gap-3 rounded-full bg-[#25D366] py-3 pl-3 pr-3 text-white shadow-[0_10px_40px_-8px_rgba(37,211,102,0.6)] transition-all hover:pr-5 md:bottom-7 md:left-7"
    >
      <svg viewBox="0 0 32 32" className="size-7 shrink-0" fill="currentColor">
        <path d="M16.003 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.257.59 4.46 1.71 6.402L3.2 28.8l6.56-1.72a12.74 12.74 0 0 0 6.243 1.59h.005c7.06 0 12.8-5.74 12.8-12.8 0-3.42-1.332-6.635-3.752-9.055A12.713 12.713 0 0 0 16.003 3.2Zm0 23.36h-.004a10.58 10.58 0 0 1-5.39-1.476l-.387-.23-4.003 1.05 1.068-3.9-.252-.4a10.56 10.56 0 0 1-1.62-5.604c0-5.866 4.774-10.64 10.644-10.64a10.57 10.57 0 0 1 7.524 3.12 10.57 10.57 0 0 1 3.117 7.525c0 5.867-4.774 10.64-10.64 10.64Zm5.834-7.965c-.32-.16-1.892-.933-2.185-1.04-.293-.107-.507-.16-.72.16-.213.32-.826 1.04-1.013 1.253-.187.213-.373.24-.693.08-.32-.16-1.35-.498-2.572-1.587-.95-.848-1.592-1.895-1.779-2.215-.186-.32-.02-.493.14-.652.144-.143.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.986-2.373-.26-.624-.524-.54-.72-.55l-.613-.011c-.213 0-.56.08-.853.4-.293.32-1.12 1.094-1.12 2.667 0 1.573 1.146 3.093 1.306 3.307.16.213 2.253 3.44 5.46 4.824.763.33 1.358.527 1.822.674.766.243 1.463.209 2.014.127.614-.092 1.892-.774 2.158-1.52.267-.747.267-1.387.187-1.52-.08-.133-.293-.213-.613-.373Z" />
      </svg>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-300 group-hover:max-w-[10rem] group-hover:opacity-100">
        Chat on WhatsApp
      </span>
    </a>
  );
}
