using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using QuickBuy.Dominio.Contratos;
using QuickBuy.Dominio.Entidades;
using System;
using System.IO;
using System.Linq;

namespace QuickBuy.Web.Controllers
{
    [Route("api/[Controller]")]
    public class ProdutosController : ControllerBase
    {
        private readonly IProdutoRepositorio _produtoRepositorio;
        private IHttpContextAccessor _httpContextAcessor;
        private IHostingEnvironment _hostingEnvironment;
        public ProdutosController(
            IProdutoRepositorio produtoRepositorio,
            IHttpContextAccessor httpContextAccessor,
            IHostingEnvironment hostingEnvironment
            )
        {
            _produtoRepositorio = produtoRepositorio;
            _httpContextAcessor = httpContextAccessor;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var produtos = _produtoRepositorio.ObterTodos();
                return Ok(produtos);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] Produto produto)
        {
            try
            {
                produto.Validate();
                if (produto.EhValido)
                {
                    _produtoRepositorio.Adicionar(produto);
                    return Created("api/produtos", produto);
                }
                return BadRequest(produto.ObterMensagensValidacao());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("EnviarArquivo")]
        public IActionResult EnviarArquivo()
        {
            try
            {
                // Tratamento do arquivo de imagem
                IFormFile formFile = _httpContextAcessor.HttpContext.Request.Form.Files["arquivoEnviado"];
                string novoNomeArquivo = GerarNovoNomeParaArquivo(formFile);

                string pastaDasImagens = $"{_hostingEnvironment.WebRootPath}\\imagens-produtos\\";
                string nomeCompleto = $"{pastaDasImagens}{novoNomeArquivo}";

                // Gravando o arquivo no servidor.
                using (var streamArquivo = new FileStream(nomeCompleto, FileMode.Create))
                {
                    formFile.CopyTo(streamArquivo);
                }

                // Gerando json para retorno
                var json = new
                {
                    nome = nomeCompleto
                };

                return Created("api/produtos/EnviarArquivo", json);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        private static string GerarNovoNomeParaArquivo(IFormFile formFile)
        {
            string nomeDoArquivo = formFile.FileName;
            string extensao = nomeDoArquivo.Split('.').Last();

            char[] arrayNomeCompacto = Path.GetFileNameWithoutExtension(nomeDoArquivo).Take(10).ToArray();
            string novoNomeDoArquivo = new string(arrayNomeCompacto).Replace(" ", "-");
            novoNomeDoArquivo = $"{novoNomeDoArquivo}{DateTime.Now.Year}{DateTime.Now.Month}{DateTime.Now.Day}{DateTime.Now.Hour}{DateTime.Now.Minute}{DateTime.Now.Second}.{extensao}";

            return novoNomeDoArquivo;
        }


    }
}
