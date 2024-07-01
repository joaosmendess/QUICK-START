module.exports = (on, config) => {
    // Configure plugins here
    // Por exemplo, você pode adicionar eventos ou comandos personalizados
    on('task', {
      log(message) {
        console.log(message);
        return null;
      },
    });
     // Retorne a configuração atualizada, se necessário
    return config;
  };