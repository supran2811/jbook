import * as esbuild from 'esbuild-wasm';
import localforage from 'localforage';
import axios from 'axios';

const fileCache = localforage.createInstance({
  name: 'filestore'
});

export const fetchPlugin = (inputCode: string) => {
    return {
        name: 'fetch-plugin',
        setup(build: esbuild.PluginBuild) {

            build.onLoad({filter: /(^index\.js$)/} , () => {
                return {
                    loader: 'jsx',
                    contents: inputCode,
                  };
            });

            build.onLoad({filter: /.*/} , async (args: any) => {

                let result = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
    
                if(result) {
                  return result;
                }
            })

           build.onLoad({filter: /.css$/} , async (args: any) => {
    
            const { data , request} = await axios.get(args.path);
            
            const escaped = data.replace(/\n/g, '').replace(/'/g,"\\'").replace(/"/g, '\\"');

            const contents = ` const style = document.createElement('style')
            style.innerText = '${escaped}';
            document.head.appendChild(style);
            `

            let result: esbuild.OnLoadResult =  {
              loader: 'jsx',
              contents,
              resolveDir: new URL('./', request.responseURL).pathname
            }
    
            await fileCache.setItem(args.path,result);
    
            return result;
    
           }); 
           build.onLoad({ filter: /.*/ }, async (args: any) => {

            const { data , request} = await axios.get(args.path);
            let result: esbuild.OnLoadResult =  {
              loader: 'jsx',
              contents: data,
              resolveDir: new URL('./', request.responseURL).pathname
            }
    
            await fileCache.setItem(args.path,result);
    
            return result;
    
          });
        }
    }
}