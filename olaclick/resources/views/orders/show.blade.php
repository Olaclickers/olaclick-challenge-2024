<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Details</title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>
<body>
    <div class="container mt-4">
        <h1>Order Details</h1>

        <h3>Order ID: {{ $order->id }}</h3>
        <p><strong>Client:</strong> {{ $order->client->name }}</p>
        <p><strong>Detail:</strong> {{ $order->detail }}</p>
        <p><strong>Total Price:</strong> {{ number_format($order->total_price, 2) }}</p>
        <p><strong>Status:</strong> {{ ucfirst($order->status) }}</p>

        <h4>Order Details</h4>

        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Item ID</th>
                    <th>Detail</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($order->orderDetails as $orderDetail)
                    <tr>
                        <td>{{ $orderDetail->item->id }}</td>
                        <td>{{ $orderDetail->item->name }}</td>
                        <td>{{ $orderDetail->quantity }}</td>
                        <td>{{ number_format($orderDetail->unit_price, 2) }}</td>
                        <td>{{ number_format($orderDetail->total_price, 2) }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>

        <a href="{{ route('orders.index') }}" class="btn btn-primary">Back to Orders</a>
    </div>

    <!-- Bootstrap 5 JS and dependencies -->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous"></script>
</body>
</html>
