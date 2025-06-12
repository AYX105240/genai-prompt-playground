using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Text.Json;

namespace Playground.WishList.Services
{
    public interface IRabbitMQService
    {
        void PublishProductUpdate(ProductUpdateEvent productUpdate);
        void SubscribeToProductUpdates(Action<ProductUpdateEvent> onProductUpdate);
    }

    public class RabbitMQService : IRabbitMQService
    {
        private readonly IConnection _connection;
        private readonly IModel _channel;

        public RabbitMQService()
        {
            var factory = new ConnectionFactory { HostName = "localhost" };
            _connection = factory.CreateConnection();
            _channel = _connection.CreateModel();

            _channel.ExchangeDeclare(exchange: "product_updates", type: "fanout");
        }

        public void PublishProductUpdate(ProductUpdateEvent productUpdate)
        {
            var message = JsonSerializer.Serialize(productUpdate);
            var body = Encoding.UTF8.GetBytes(message);

            _channel.BasicPublish(exchange: "product_updates",
                                 routingKey: "",
                                 basicProperties: null,
                                 body: body);
        }

        public void SubscribeToProductUpdates(Action<ProductUpdateEvent> onProductUpdate)
        {
            var queueName = _channel.QueueDeclare().QueueName;
            _channel.QueueBind(queue: queueName,
                               exchange: "product_updates",
                               routingKey: "");

            var consumer = new EventingBasicConsumer(_channel);
            consumer.Received += (model, ea) =>
            {
                var body = ea.Body.ToArray();
                var message = Encoding.UTF8.GetString(body);
                var productUpdate = JsonSerializer.Deserialize<ProductUpdateEvent>(message);
                if (productUpdate != null)
                {
                    onProductUpdate?.Invoke(productUpdate);
                }
            };

            _channel.BasicConsume(queue: queueName,
                                   autoAck: true,
                                   consumer: consumer);
        }

        public void Dispose()
        {
            _channel?.Dispose();
            _connection?.Dispose();
        }
    }

    public class ProductUpdateEvent
    {
        public int ProductId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public decimal Price { get; set; }
    }
}
