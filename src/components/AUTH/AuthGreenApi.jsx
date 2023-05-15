import { useState } from "react";
import React from "react";

export const AuthGreenApi = ({ setAuth }) => {
  const [inputValueIdInstance, setInputValueIdInstance] = useState("");
  const [inputValueApiTokenInstance, setInputValueApiTokenInstance] = useState("");

  const verifyData = async () => {
    try {
      const idInstance = inputValueIdInstance;
      const apiTokenInstance = inputValueApiTokenInstance;
      const url = `https://api.green-api.com/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`;

      const response = await fetch(url);
      const data = await response.json();

      console.log(data);

      // Проверьте, является ли ответ от Green API положительным
      if (data.stateInstance === "authorized") {
        alert("Вы авторизованы !");
        setAuth(false);
      }
    } catch (error) {
      alert("Ошибка: неправильные данные");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow">
        <form className="w-96">
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              onInput={(event) => (event.target.value = event.target.value.replace(/\D/g, ""))}
              placeholder="Введите свой idInstance"
              value={inputValueIdInstance}
              onChange={(e) => setInputValueIdInstance(e.target.value)}
              className="border border-gray-300 p-3 rounded"
            />
            <input
              type="text"
              placeholder="Введите свой apiTokenInstance)"
              className="border border-gray-300 p-3 rounded"
              value={inputValueApiTokenInstance}
              onChange={(e) => setInputValueApiTokenInstance(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={verifyData}
            className="bg-blue-500 text-white p-2 rounded mt-4 w-full"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};