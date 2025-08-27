<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
    /**
     * Determina si el usuario está autorizado para realizar esta solicitud.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;  // Aquí puedes agregar lógica de autorización si es necesario
    }

    /**
     * Obtiene las reglas de validación que se deben aplicar a la solicitud.
     *
     * @return array
     */
    public function rules()
    {
      return [
      ];

     }

    /**
     * Obtener los mensajes de error personalizados.
     *
     * @return array
     */
    public function messages()
    {
        return [
        ];
    }
}
