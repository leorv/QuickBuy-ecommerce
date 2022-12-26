using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
                _produtoRepositorio.Adicionar(produto);
                return Created("api/produto", produto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("EnviarImagem")]
        public IActionResult EnviarImagem()
        {
            try
            {
                // Tratamento do arquivo de imagem
                IFormFile formFile = _httpContextAcessor.HttpContext.Request.Form.Files["arquivoEnviado"];
                string nomeDoArquivo = GerarNovoNomeParaArquivo(formFile);

                string pastaDasImagens = _hostingEnvironment.WebRootPath.Concat("\\imagens-produtos\\").ToString();
                string caminhoComNome = pastaDasImagens.Concat(nomeDoArquivo).ToString();

                // Gravando o arquivo no servidor.
                using (var streamArquivo = new FileStream(caminhoComNome, FileMode.Create))
                {
                    formFile.CopyTo(streamArquivo);
                }

                return Created("api/produtos/EnviarImagem", nomeDoArquivo);
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
            novoNomeDoArquivo += $"{DateTime.Now}.{extensao}";
            return novoNomeDoArquivo;
        }
    }
}
