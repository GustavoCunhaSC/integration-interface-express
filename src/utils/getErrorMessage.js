export function getErrorMessage(error) {
  if (error.response) {
    return error.response.data?.message ?? `A API respondeu com erro ${error.response.status}.`
  }

  if (error.request) {
    return 'Não foi possível obter uma resposta da API. Confira a conexão e o servidor.'
  }

  return error.message ?? 'Ocorreu um erro inesperado.'
}
