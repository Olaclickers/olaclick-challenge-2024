<template>
    <div class="m-5">
        <table class="table">
            <thead class="table-dark">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Detalle</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Total ($)</th>
                    <th scope="col">Estado</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Pollo a al brasa</td>
                    <td>Juan Perez</td>
                    <td>120.00</td>
                    <td class="text-center">
                        <button type="button" class="btn btn-warning"><i class="fa-regular fa-clock"></i> Iniciado</button>
                    </td>
                </tr>

                <tr>
                    <th scope="row">2</th>
                    <td>Ensalada cesar + coca cola</td>
                    <td>José José</td>
                    <td>140.00</td>
                    <td class="text-center">
                        <button type="button" class="btn btn-success"><i class="fa-solid fa-check"></i> Enviado</button>
                    </td>
                </tr>

                <tr>
                    <th scope="row">10</th>
                    <td>Lomo saltado + Chicha morada</td>
                    <td>Andrés</td>
                    <td>90.00</td>
                    <td class="text-center">
                        <button type="button" class="btn btn-success"><i class="fa-solid fa-check"></i> Enviado</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script>

export default {

    name: 'AppTable'
}
</script>