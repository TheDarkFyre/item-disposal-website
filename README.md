# Recyclu

A Next.js application that generates safe disposal instructions for everyday items based on uploaded images, leveraging OpenAI’s GPT-4 Image Response endpoint. Tailored for San Jose, California, it helps users determine whether to recycle parts, throw items in the trash, or take them to a specialized disposal center.

## Features

- **Image Upload**: Drag-and-drop or click to browse and upload an image of your item.  
- **AI-Powered Instructions**: Backend API calls OpenAI’s image-response endpoint to produce detailed, location-specific disposal guidance.  
- **Responsive UI**: Clean, minimal interface built with React and CSS Modules.  
- **Easy Deployment**: Ready for local development and Vercel deployment out of the box.

## Getting Started

### Prerequisites

- **Node.js** (v18 or higher)  
- **npm** or **Yarn**  
- An **OpenAI API Key**  

### Installation

```bash
git clone https://github.com/TheDarkFyre/item-disposal-website.git
cd item-disposal-website
npm install       # or yarn install
```

### Environment Variables

Create a file named `.env` in the project root with your OpenAI API key:

```env
OPENAI_API_KEY=sk-...
```

### Running Locally

```bash
npm run dev       # or yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building & Starting

```bash
npm run build
npm run start
```

## Project Structure

```plaintext
.
├── public/
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg       # Icons and favicons
├── src/
│   └── app/
│       ├── api/
│       │   └── chatgpt/
│       │       └── route.js       # Handles multipart image and OpenAI call
│       ├── components/
│       │   ├── prompt-form.js     # File upload form component
│       │   └── prompt-form.module.css
│       ├── globals.css            # Global styles (background, reset)
│       ├── layout.js              # Root HTML layout
│       ├── page.js                # Main UI logic (state, form, responses)
│       └── page.module.css        # Page-specific styles (card, responses)
├── .gitignore
├── next.config.mjs
├── package.json                   # Project dependencies & scripts
└── README.md                      # You are here
```

## Configuration

- **Disposal Prompt**: Modify the developer prompt in `src/app/api/chatgpt/route.js` if you need instructions for a different city or style.
- **Styling**: Tweak CSS Modules in `page.module.css` and `prompt-form.module.css` for custom theming.

## Dependencies

- Next.js `^15.3.1`
- React `^19.0.0`
- OpenAI SDK `^4.96.0`
- react-markdown `^10.1.0`
- remark-gfm `^4.0.1`

## Deployment

Deploy instantly on Vercel:

1. Sign in at [vercel.com](https://vercel.com)  
2. Import the GitHub repository  
3. Set the `OPENAI_API_KEY` environment variable  
4. Click **Deploy**

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to:

1. Fork the repository  
2. Create your feature branch (`git checkout -b feature/my-feature`)  
3. Commit your changes (`git commit -m 'Add my feature'`)  
4. Push to the branch (`git push origin feature/my-feature`)  
5. Open a Pull Request  

## License

This project does not specify a license. Please contact the repository owner for licensing details.

