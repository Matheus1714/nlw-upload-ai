# NLW | Upload AI Web 🚀

![GitHub](https://img.shields.io/github/license/Matheus1714/nlw-upload-ai)

![banner-font](.github/animation-banner.gif)

<a id="readme-top"></a>

## Table of Content 📜
<!--ts-->
   * [About](#about-ℹ️)
   * [About NLW](#about-nlw-🚀)
   * [Technologies Used](#technologies-used-⚙️)
   * [Features](#features-✅)
   * [Package Dependencies](#package-dependencies-⬇️)
   * [Running the Project](#running-the-project-🏃)
   * [What I learn](#what-i-learn-📝)
   * [Acknowledge](#acknowledge-☺️)
   * [License](#license-📖)
<!--te-->

## About ℹ️

Welcome to the Upload AI Web project, where you can effortlessly upload videos and have automatic titles and descriptions generated for you.

<p align="right"><a href="#readme-top">🔝 Return</a></p>

## About NLW 🚀

NLW (Next Level Week) is an event organized by Rocketseat, dedicated to exploring cutting-edge technologies and empowering programmers to build high-quality projects quickly.

This project was created during NLW to embrace and master the latest technologies, resulting in an application powered by multiple advanced technologies.

<p align="right"><a href="#readme-top">🔝 Return</a></p>

## Technologies Used ⚙️

The technologies utilized in this project include:

* [ReactJS + Vite](https://vitejs.dev/)
* [Typescript](https://www.typescriptlang.org/)
* [Tailwind](https://tailwindcss.com/)
* [Shadcn/UI](https://ui.shadcn.com/)
* [OpenAI](https://openai.com/)

<p align="right"><a href="#readme-top">🔝 Return</a></p>

## Features ✅

- [X] Create Screens
- [X] Integrate a Back-end
- [X] Integrate OpenAI

<p align="right"><a href="#readme-top">🔝 Return</a></p>

## Package Dependencies ⬇️

Here is a list of the project's package dependencies:

```json
"dependencies": {
    "@ffmpeg/ffmpeg": "^0.12.6",
    "@ffmpeg/util": "^0.12.1",
    "@radix-ui/react-dropdown-menu": "^2.0.5",
    "@radix-ui/react-icons": "^1.3.0",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-select": "^1.2.2",
    "@radix-ui/react-separator": "^1.0.3",
    "@radix-ui/react-slider": "^1.1.2",
    "@radix-ui/react-slot": "^1.0.2",
    "ai": "^2.2.12",
    "axios": "^1.5.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "lucide-react": "^0.276.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwind-merge": "^1.14.0",
    "tailwindcss-animate": "^1.0.7"
},
"devDependencies": {
    "@types/node": "^20.6.0",
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "@vitejs/plugin-react": "^4.0.3",
    "autoprefixer": "^10.4.15",
    "eslint": "^8.45.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.3",
    "postcss": "^8.4.29",
    "tailwindcss": "^3.3.3",
    "typescript": "^5.0.2",
    "vite": "^4.4.5"
}
```

<p align="right"><a href="#readme-top">🔝 Return</a></p>

## Running the Project 🏃

1. Configure the api repository: https://github.com/Matheus1714/nlw-upload-ai-api

To get started with the project, follow these steps:

2. Install the project dependencies:

```
pnpm i
```

3. Execute the following command in your terminal to run the project:

```
pnpm run dev
```

_Obs: Both this repositories and [api-repository](https://github.com/Matheus1714/nlw-upload-ai-api) must runnig together._

<p align="right"><a href="#readme-top">🔝 Return</a></p>

## What I learn 📝

### Tailwind

One key takeaway from this project is the power of Tailwind CSS in simplifying the process of creating stylish designs using only class-based components. For example:

```tsx
<span className="text-sm text-muted-foreground">
    Desenvolvido com ❤️ no NLW da Rocketseat
</span>
```

### Shadcn/UI

I discovered that the Shadcn/UI package offers pre-designed components with beautiful styles that can be easily customized using Tailwind CSS. This library includes various designs that can be added to the src/components folder.

I began using Shadcn/UI by initializing it with the following command:

```shell
pnpm dlx shadcn-ui@latest init
```

I then incorporated these components into my project using the following commands:

```shell
pnpm dlx shadcn-ui@latest add slider
pnpm dlx shadcn-ui@latest add select
pnpm dlx shadcn-ui@latest add label
pnpm dlx shadcn-ui@latest add textarea
pnpm dlx shadcn-ui@latest add separator
pnpm dlx shadcn-ui@latest add button
```

This made it convenient to enhance my project's user interface with these pre-designed components.

### FFMPEG

Using FFMPEG I learn how process a video `mp4` to `mp3` using browser user processing (Web Assembly).

```tsx
// src/components/video-input-form.tsx

async function convertVideioToAudio(video: File){
    console.log('Convert started')

    const ffmpeg = await getFFmpeg()

    await ffmpeg.writeFile('input.mp4', await fetchFile(video))

    // ffmpeg.on('log', log => console.log(log))

    ffmpeg.on('progress', progress => {
        console.log('Convert progress: ' + Math.round(progress.progress * 100))
    })

    await ffmpeg.exec([
        '-i',
        'input.mp4',
        '-map',
        '0:a',
        '-b:a',
        '20k',
        '-acodec',
        'libmp3lame',
        'output.mp3'
    ])

    const data = await ffmpeg.readFile('output.mp3')

    const audioFileBlob = new Blob([data], { type: 'audio/mpeg' })
    const audioFile = new File([audioFileBlob], 'audio.mp3', {
        type: 'audio/mpeg'
    })

    console.log('Convert finishied')

    return audioFile
}
```

### OpenAI Stream

I learn how use the hook `useCompletion` from OpenAI to generate a text that complete in parts my response.

```tsx
// src/app.tsx

const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
} = useCompletion({
    api: 'http://localhost:3333/ai/complete',
    body: {
      videoId,
      temperature,
    },
    headers: {
      'Content-Type': 'application/json'
    }
})
```

<p align="right"><a href="#readme-top">🔝 Return</a></p>

## Acknowledge ☺️

A special thanks to Rocketseat and their dedicated instructors who provide incredible content to the React community, making projects like this possible. Your guidance and support are greatly appreciated.

<p align="right"><a href="#readme-top">🔝 Return</a></p>

## License 📖

This project is open-source and is distributed under the MIT License. Feel free to explore, modify, and utilize the codebase according to the terms outlined in the license.

<p align="right"><a href="#readme-top">🔝 Return</a></p>
