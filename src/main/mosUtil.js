/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import { AudioStats, StatsInfo } from './types';
let audioStatus;
let supportsMos = false;

function getAvgStats(streamType) {
    const stats = audioStatus[streamType];
    return {
        packetsCount: stats.packetsCount / stats.statsCount,
        packetsLost: stats.packetsLost / stats.statsCount,
        jitterBufferMillis: stats.jitterBufferMillis / stats.statsCount,
        roundTripTimeMillis: stats.roundTripTimeMillis / stats.statsCount
    };
}

function getMOSByStream(streamType) {
    const avgStats = getAvgStats(streamType);
    const effectiveLatency = avgStats.roundTripTimeMillis + (avgStats.jitterBufferMillis * 2) + 10.0;
    let R = 0;
    if (effectiveLatency < 160) {
        R = 93.2 - (effectiveLatency / 40);
    } else {
        R = 93.2 - (effectiveLatency - 120) / 10;
    }
    R -= avgStats.packetsLost / avgStats.packetsCount * 2.50;
    return 1 + (0.035) * R + (.000007) * R * (R - 60) * (100 - R);
}

export function enableMos() {
    supportsMos = true;
}

export function getMOS() {
    if (!supportsMos) {
        return undefined;
    }
    const inputChannelMOS = getMOSByStream('inputChannelStats');
    const ouputChannelMOS = getMOSByStream('ouputChannelStats');
    if (isNaN(ouputChannelMOS) && isNaN(inputChannelMOS)) {
        return 0;
    } else if (isNaN(ouputChannelMOS)) {
        return inputChannelMOS;
    } else if (isNaN(inputChannelMOS)) {
        return ouputChannelMOS;
    } else {
        return Math.min(inputChannelMOS, ouputChannelMOS);
    }
}

export function initAudioStats() {
    audioStatus = new AudioStats({inputChannelStats: new StatsInfo({packetsCount: 0, packetsLost: 0, jitterBufferMillis: 0, roundTripTimeMillis: 0}), 
                               ouputChannelStats: new StatsInfo({packetsCount: 0, packetsLost: 0, jitterBufferMillis: 0, roundTripTimeMillis: 0})});
}

export function updateAudioStats(stats) {
    if (stats.inputChannelStats) {
        audioStatus.inputChannelStats.statsCount++;
        audioStatus.inputChannelStats.packetsCount += stats.inputChannelStats.packetsCount | 0;
        audioStatus.inputChannelStats.packetsLost += stats.inputChannelStats.packetsLost | 0;
        audioStatus.inputChannelStats.jitterBufferMillis += stats.inputChannelStats.jitterBufferMillis | 0;
        audioStatus.inputChannelStats.roundTripTimeMillis += stats.inputChannelStats.roundTripTimeMillis | 0;
    }
    if (stats.ouputChannelStats) {
        audioStatus.ouputChannelStats.statsCount++;
        audioStatus.ouputChannelStats.packetsCount += stats.ouputChannelStats.packetsCount | 0;
        audioStatus.ouputChannelStats.packetsLost += stats.ouputChannelStats.packetsLost | 0;
        audioStatus.ouputChannelStats.jitterBufferMillis += stats.ouputChannelStats.jitterBufferMillis | 0;
        audioStatus.ouputChannelStats.roundTripTimeMillis += stats.ouputChannelStats.roundTripTimeMillis | 0;
    }
}