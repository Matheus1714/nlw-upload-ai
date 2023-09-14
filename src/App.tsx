import { ThemeProvider } from "@/components/theme-provider";
import { useCompletion } from 'ai/react';
import { Github, Wand2 } from 'lucide-react';
import { useState } from 'react';
import { ModeToggle } from './components/mode-toggle';
import { PromptSelect } from './components/prompt-select';
import { Button } from "./components/ui/button";
import { Label } from './components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Separator } from './components/ui/separator';
import { Slider } from './components/ui/slider';
import { Textarea } from './components/ui/textarea';
import { VideoInputForm } from './components/video-input-form';

export function App(){
  const [temperature, setTemperature] = useState<number>(0.5)
  const [videoId, setVideoId] = useState<string | null>(null)

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

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className='min-h-screen flex flex-col'>
        <header className="px-6 py-3 flex items-center justify-between border-b">
          <h1 className="text-xl font-bold">upload.ai</h1>

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              Desenvolvido com ❤️ no NLW da Rocketseat
            </span>

            <Separator orientation="vertical" className="h-6" />

            <ModeToggle />

            <Separator orientation="vertical" className="h-6" />

            <Button variant="outline"><Github className='w-4 h-4 mr-2'/> Github</Button>
          </div>

        </header>
        <main className='flex flex-col p-6 flex gap-6 md:flex-row'>
          <div className='w-full flex flex-col flex-1 gap-4 order-2 md:order-1'>
            <div className='grid grid-rows-2 gap-4 flex-1'>
              <Textarea 
                placeholder='Inclua o prompt para a IA...'
                className='resize-none p-4 leading-relaxed'
                value={input}
                onChange={handleInputChange}
              />
              <Textarea 
                placeholder='Resultado gerado pela IA...'
                className='resize-none p-4 leading-relaxed'
                readOnly
                value={completion}
              />
            </div>
            <p className='text-sm text-muted-foreground'>
              Lembre-se: você pode usar a variável <code className='text-violet-400'>{'{transcription}'}</code> no seu prompt para adicionar o conteúdo da trancrição do vídeo selecionado
            </p>
          </div>

          <aside className='w-full md:w-80 space-y-6 order-1 md:order-2'>
            <VideoInputForm onVideoUploaded={setVideoId} />

            <Separator />
            <form onSubmit={handleSubmit} className='space-y-6'>

              <div className='space-y-2'>
                <Label>Prompt</Label>
                <PromptSelect onPromptSelected={setInput} />
              </div>

              <div className='space-y-2'>
                <Label>Modelo</Label>
                <Select disabled defaultValue="gpt3.5">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt3.5">GTP 3.5-turbo 16k</SelectItem>
                  </SelectContent>
                </Select>
                <span className='block text-xs text-muted-foreground italic'>
                  Você poderá customizar essa opção em breve
                </span>
              </div>

              <Separator />

              <div className='space-y-4'>
                <Label>Temperatura</Label>

                <Slider 
                  min={0}
                  max={1}
                  step={0.1}
                  value={[temperature]}
                  onValueChange={value => setTemperature(value[0])}
                />
                
                <span className='block text-xs text-muted-foreground italic leading-relaxed'>
                  Valores mais altos tendem a deixar o resultado mais criativo e com possíveis erros
                </span>
              </div>

              <Separator />


              <Button disabled={isLoading} type='submit' className='w-full'>
                Executar
                <Wand2 className='w-4 h-4 ml-2' />
              </Button>
            </form>
          </aside>
        </main>
      </div>
    </ThemeProvider>
  )
}