<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Orders List</title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>

<body>
    <div class="container mt-4">
        <h1 class="mb-4">Orders List</h1>

        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Detail</th>
                    <th>Client</th>
                    <th>Total Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($orders as $order)
                    <tr style="cursor: pointer;" onclick="window.location='{{ route('orders.show', $order->id) }}'">
                        <td>{{ $order->id }}</td>
                        <td>{{ $order->detail }}</td>
                        <td>{{ $order->client->name }}</td>
                        <td>{{ number_format($order->total_price, 2) }}</td>
                        @if ($order->status === 'sent')
                            <td><span class="badge text-bg-warning">{{ ucfirst($order->status) }}</span></td>
                        @elseif ($order->status === 'initiated')
                            <td><span class="badge text-bg-info">{{ ucfirst($order->status) }}</span></td>
                        @else
                            <td>{{ ucfirst($order->status) }}</td>
                        @endif

                        <td>
                            <a href="{{ route('orders.show', $order->id) }}" class="btn btn-light">View</a>
                            <!--<ul class="list-unstyled">
                                @foreach ($order->orderDetails as $orderDetail)
                                    <li>
                                        {{ $orderDetail->item->name }} -
                                        Quantity: {{ $orderDetail->quantity }},
                                        Unit Price: {{ number_format($orderDetail->unit_price, 2) }},
                                        Total: {{ number_format($orderDetail->total_price, 2) }}
                                    </li>
                                @endforeach
                            </ul>-->
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>

        <!-- Pagination Links -->
        <div class="d-flex justify-content-center">
            {{ $orders->links() }}
        </div>
    </div>

    <!-- Bootstrap 5 JS and dependencies -->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
        integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js"
        integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy"
        crossorigin="anonymous"></script>
</body>

</html>