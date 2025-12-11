# LLama swap to Llama.cpp

Convert a yaml Llama swap models config file to a ini Llama.cpp models config file.

## Usage

Install:

```bash
git clone https://github.com/synw/llamaswap-to-llamacpp
cd llamaswap-to-llamacpp
npm install
```

Run with the path to your Llama swap `config.yml` file:

```bash
node convert-models.js path/to/my/llama-swap/config.yml
```

This will produce a `config.ini` file

Run with llama-server:

```bash
llama-server --models-preset conf.ini --models-max 1
```